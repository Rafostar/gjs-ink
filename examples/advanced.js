const { Ink } = imports.ink;

let green = new Ink.Printer({
    color: Ink.Color.GREEN
});

let blinkYellow = new Ink.Printer({
    font: Ink.Font.BLINK,
    color: Ink.colorFromHex('#ffff00')
});

let bgLightBlue = new Ink.Printer({
    font: [
        Ink.Font.BOLD,
        Ink.Font.ITALIC,
        Ink.Font.UNDERLINE
    ],
    color: Ink.Color.RED,
    background: Ink.Color.LIGHT_BLUE
});

green.print('green text in stdout');
green.printerr('green text in stderr');
bgLightBlue.print('light blue background');
blinkYellow.print('blinking text');

let various = new Ink.Printer({
    color: Ink.Color.VARIOUS
});

various.print('various color');
various.print('other color');
various.print('yet another various color');
various.print(['supports', 'printing', 'arrays', 'and' , 'multiple', 'arguments', '!']);

various.font = [Ink.Font.UNDERLINE];
various.print('printer', 'values', 'may', 'be', 'changed', 'at', 'runtime');

let lightMagenta = new Ink.Printer({
    color: Ink.Color.LIGHT_MAGENTA
});

lightMagenta.print(
`This single
text is printed
in multiple lines`
);

various.color = Ink.Color.LIGHT_BROWN;
bgLightBlue.font.push(Ink.Font.REVERSE);

print(
    green.getPainted('can also return'),
    various.getPainted('painted text'),
    bgLightBlue.getPainted('for use with standard "print()"')
);
