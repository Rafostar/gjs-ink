const { Ink } = imports.ink;

let printer = new Ink.Printer();

for(let color in Ink.Color) {
    if(color === 'VARIOUS')
        continue;

    let str = `${color}: `;
    while(str.length < 18)
        str += ' ';

    for(let font in Ink.Font) {
        if(['VARIOUS', 'HIDDEN'].includes(font))
            continue;

        printer.font = Ink.Font[font];
        printer.color = Ink.Color[color];

        let painted = printer.getPainted(font) + ' ';
        str += painted;
    }
    print(str);
}
