const { Ink } = imports.ink;

let printer = new Ink.Printer();

for(let color in Ink.TextColor) {
    if(color === 'VARIOUS')
        continue;

    let str = `${color}: `;
    while(str.length < 18)
        str += ' ';

    for(let font in Ink.TextFont) {
        if(['VARIOUS', 'HIDDEN'].includes(font))
            continue;

        printer.font = Ink.TextFont[font];
        printer.color = Ink.TextColor[color];

        let painted = printer.getPainted(font) + ' ';
        str += painted;
    }
    print(str);
}
