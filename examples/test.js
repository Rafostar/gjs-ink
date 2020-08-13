const { Ink } = imports.ink;

let printer = new Ink.Printer();

for(let font in Ink.TextFont) {
    if(['VARIOUS', 'HIDDEN'].includes(font))
        continue;

    let str = '';
    for(let color in Ink.TextColor) {
        if(!color.startsWith('LIGHT'))
            continue;

        printer.font = Ink.TextFont[font];
        printer.color = Ink.TextColor[color];

        let textLength = font.length;
        let painted = printer.getPainted(font);

        while(textLength < 11) {
            painted += ' ';
            textLength++;
        }

        str += painted;
    }
    print(str);
}
