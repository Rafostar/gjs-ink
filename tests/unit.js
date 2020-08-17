const { Ink, Photo } = imports.ink;

function compare(A, B)
{
    if(A === B) {
        return log(A + ' === ' + B);
    }

    throw new Error(A + ' !== ' + B);
}

let input;
let result;

let printer = new Ink.Printer({
    font: Ink.Font.REGULAR,
    color: Ink.Color.DEFAULT,
    background: Ink.Color.DEFAULT
});
Ink.maxTransparency = 11;

/* Test random color 256 */
compare(typeof Ink.colorFrom256(), 'string');
log(Ink.colorFrom256() + '\n');

/* Test random color 16M */
compare(typeof Ink.colorFromRGB(), 'string');
log(Ink.colorFromRGB() + '\n');

/* Test colorFrom256() */
compare(Ink.colorFrom256(32), '38;5;32');

/* Test colorFromRGB() */
compare(Ink.colorFromRGB(255, 145, 74, 11), Ink.Color.DEFAULT);
compare(Ink.colorFromRGB(255, 145, 74, 12), '38;2;255;145;74');
compare(Ink.colorFromRGB([255, 145, 74, 11]), Ink.Color.DEFAULT);
compare(Ink.colorFromRGB([255, 145, 74, 12]), '38;2;255;145;74');
compare(Ink.colorFromRGB(255, 145, 74), '38;2;255;145;74');
compare(Ink.colorFromRGB(255, 145), '38;2;255;145;0');
compare(Ink.colorFromRGB(255), '38;2;255;0;0');
compare(Ink.colorFromRGB(1,0,0,10), Ink.Color.DEFAULT);

/* Test colorFromHex() */
compare(Ink.colorFromHex('#fF914A0B'), Ink.Color.DEFAULT);
compare(Ink.colorFromHex('#fF914A0C'), '38;2;255;145;74');
compare(Ink.colorFromHex('#090099'), '38;2;9;0;153');
compare(Ink.colorFromHex('102000'), '38;2;16;32;0');
compare(Ink.colorFromHex('10', '20'), '38;2;16;32;0');
compare(Ink.colorFromHex(['10', '20']), '38;2;16;32;0');
compare(Ink.colorFromHex(['10', '20', '00', '10']), '38;2;16;32;0');
compare(Ink.colorFromHex(['10', '20', '00', '09']), Ink.Color.DEFAULT);

/* Test getPainted() on string*/
compare(printer.getPainted(' '), '\u001b[0;39;49m \u001b[0m');

input = [
    [[255,0,0,255], [0,255,0,255]],
    [[0,0,255,255], [0,255,0,0]]
];
result = '\u001b[0;38;2;255;0;0;48;2;255;0;0m  ' +
    '\u001b[0;38;2;0;255;0;48;2;0;255;0m  \u001b[0m\n' +
    '\u001b[0;38;2;0;0;255;48;2;0;0;255m  ' +
    '\u001b[0;39;39m  \u001b[0m\n';

/* Test getPainted() on image array */
compare(printer.getPainted(input), result);
