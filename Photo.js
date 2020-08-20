const { GdkPixbuf } = imports.gi;
const ByteArray = imports.byteArray;

const noop = () => {};

var Scanner = class
{
    constructor(opts)
    {
        opts = opts || {};

        const defaults = {
            size_x: -1,
            size_y: -1,
            keep_aspect: true
        };

        for(let def in defaults) {
            this[def] = (typeof opts[def] !== 'undefined')
                ? opts[def] : defaults[def];
        }
    }

    scan(source, isResource, cancellable)
    {
        let type = (isResource && isResource === true)
            ? 'resource'
            : (typeof source === 'string')
            ? 'file'
            : 'stream';

        return this._scanSync(source, type, cancellable);
    }

    scanPixbuf(pixbuf)
    {
        if(!pixbuf)
            return null;

        let pixels = pixbuf.get_pixels();
        let valuesPerPixel = pixbuf.get_n_channels();
        let rowstride = pixbuf.get_rowstride();

        let x = 0;
        let y = 0;
        let pixelsArray = [];

        while(y < pixbuf.height) {
            pixelsArray[y] = [];
            for(let i = 0; i < rowstride / valuesPerPixel; i++) {
                pixelsArray[y][i] = [];
                for(let j = 0; j < valuesPerPixel; j++) {
                    pixelsArray[y][i][j] = pixels[x + j];
                }
                x += valuesPerPixel;
            }
            y++;
        }

        return pixelsArray;
    }

    scanStreamAsync(stream, cancellable, cb)
    {
        cb = (typeof cancellable === 'function')
            ? cancellable
            : (cb)
            ? cb
            : noop;

        cancellable = (!cancellable || typeof cancellable === 'function')
            ? null : cancellable;

        GdkPixbuf.Pixbuf.new_from_stream_at_scale_async(
            stream,
            this.size_x,
            this.size_y,
            this.keep_aspect,
            cancellable,
            (self, task) => this._onStreamLoaded(task, cb)
        );
    }

    scanStreamPromise(stream, cancellable)
    {
        return new Promise((resolve, reject) => {
            this.scanStreamAsync(stream, cancellable, (err, image) => {
                (err) ? reject(err) : resolve(image);
            });
        });
    }

    _scanSync(source, type, cancellable)
    {
        let args = [
            source,
            this.size_x,
            this.size_y,
            this.keep_aspect
        ];

        if(type === 'stream') {
            cancellable = cancellable || null;
            args.push(cancellable);
        }

        let pixbuf = GdkPixbuf.Pixbuf[
            `new_from_${type}_at_scale`].apply(this, args);

        return this.scanPixbuf(pixbuf);
    }

    _onStreamLoaded(task, cb)
    {
        if(task.had_error())
            return cb(new Error('stream task had an error'));

        let pixbuf = GdkPixbuf.Pixbuf.new_from_stream_finish(task);

        if(!pixbuf)
            return cb(new Error('could not create pixbuf from stream'));

        let parsed = this.scanPixbuf(pixbuf);

        if(!parsed)
            return cb(new Error('could not parse pixbuf'));

        cb(null, parsed);
    }
}
