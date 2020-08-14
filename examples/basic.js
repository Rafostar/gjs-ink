const { Ink } = imports.ink;

let printer = new Ink.Printer({
    font: Ink.Font.BOLD,
    color: Ink.Color.GREEN,
    background: Ink.Color.DEFAULT
});

printer.print('Hello World');
