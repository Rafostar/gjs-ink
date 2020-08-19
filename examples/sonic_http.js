const { Soup } = imports.gi;
const { Ink, Photo } = imports.ink;

let session = new Soup.Session();
let scanner = new Photo.Scanner();
let printer = new Ink.Printer();

let request = session.request(
    'https://raw.githubusercontent.com/Rafostar/ink/media/images/sonic_28x39.png'
);
let stream = request.send(null);
let image = scanner.scan(stream);

printer.print(image);
