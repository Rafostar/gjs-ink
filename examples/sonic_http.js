const { GdkPixbuf, Gio, Soup } = imports.gi;
const { Ink, Photo } = imports.ink;

const DOWNLOAD_PATH = '/tmp/sonic_ink.png';

let session = new Soup.Session();
let scanner = new Photo.Scanner({ size_y: 39 });
let printer = new Ink.Printer();

let message = Soup.Message.new(
    'GET', 'https://raw.githubusercontent.com/Rafostar/gjs-ink/media/images/sonic.png'
);

let file = Gio.file_new_for_path(DOWNLOAD_PATH);
let fstream = file.replace(null, false, Gio.FileCreateFlags.NONE, null);

message.connect('got_chunk', (self, chunk) => {
    fstream.write(chunk.get_data(), null);
});
session.send_message(message);
fstream.close(null);

if(message.status_code === 200) {
    let image = scanner.scan(DOWNLOAD_PATH);
    printer.print(image);
}
else {
    printer.color = Ink.Color.LIGHT_RED;
    printer.print('Image download unsuccessful');
}
