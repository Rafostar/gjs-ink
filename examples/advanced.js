const { Ink } = imports.ink;

let green = new Ink.Printer({
    color: Ink.TextColor.GREEN
});

let blinkYellow = new Ink.Printer({
    font: Ink.TextFont.BLINK,
    color: Ink.TextColor.YELLOW
});

let bgLightBlue = new Ink.Printer({
    font: [
        Ink.TextFont.BOLD,
        Ink.TextFont.ITALIC,
        Ink.TextFont.UNDERLINE
    ],
    color: Ink.TextColor.RED,
    background: Ink.BackgroundColor.LIGHT_BLUE
});

green.print('green text in stdout');
green.printerr('green text in stderr');

bgLightBlue.print('light blue background');
blinkYellow.print('blinking text');

let various = new Ink.Printer();

various.print('various color');
various.print('other various color');
various.print('another various color');

various.print(['supports', 'printing', 'arrays', 'and' , 'multiple', 'arguments', '!']);

various.font = [Ink.TextFont.UNDERLINE];
various.print('printer', 'values', 'may', 'be', 'changed', 'at', 'runtime');

let lightMagenta = new Ink.Printer({
    color: Ink.TextColor.LIGHT_MAGENTA
});

lightMagenta.print(
`This single
text is printed
in multiple lines`
);

various.color = Ink.TextColor.LIGHT_BROWN;
bgLightBlue.font.push(Ink.TextFont.REVERSE);

print(
    green.getPainted('can also return'),
    various.getPainted('painted text'),
    bgLightBlue.getPainted('for use with standard "print()"')
);
