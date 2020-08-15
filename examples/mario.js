const { Ink, Photo } = imports.ink;

let scanner = new Photo.Scanner({ size_y: 16 });
let image = scanner.scan('./examples/mario.png');

let printer = new Ink.Printer();
printer.print(image);
