const { GdkPixbuf } = imports.gi;
const ByteArray = imports.byteArray;

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

    scan(filePath)
    {
        let pixbuf = GdkPixbuf.Pixbuf.new_from_file_at_scale(
            filePath, this.size_x, this.size_y, this.keep_aspect
        );

        return this.parsePixbuf(pixbuf);
    }

    parsePixbuf(pixbuf)
    {
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
}
