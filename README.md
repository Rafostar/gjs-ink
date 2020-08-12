# gjs-ink
[![License](https://img.shields.io/github/license/Rafostar/gjs-ink.svg)](https://github.com/Rafostar/gjs-ink/blob/master/COPYING)
[![Donate](https://img.shields.io/badge/Donate-PayPal-blue.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=TFVDFD88KQ322)
[![Donate](https://img.shields.io/badge/Donate-PayPal.Me-lightgrey.svg)](https://www.paypal.me/Rafostar)
[![Twitter](https://img.shields.io/twitter/url/https/github.com/Rafostar/gjs-ink.svg?style=social)](https://twitter.com/intent/tweet?text=Wow:&url=https%3A%2F%2Fgithub.com%2FRafostar%2Fgjs-ink)

Terminal text color printing and styling for GJS.

<p align="center">
<img src="https://raw.githubusercontent.com/Rafostar/gjs-ink/other/images/promo.png">
</p>

## Installation
Just download this repository contents to `/usr/share/gjs-1.0/ink` folder.
```
git clone https://github.com/Rafostar/gjs-ink.git /usr/share/gjs-1.0/ink
```
Alternatively download it to `ink` folder in any other location and export that location path with `GJS_PATH` environment variable.

## Manual
Instructions how to use with full list of available options and functions can be found in [wiki](https://github.com/Rafostar/gjs-ink/wiki).

## Examples
#### [basic.js](https://raw.githubusercontent.com/Rafostar/gjs-ink/other/examples/basic.js)
```javascript
const { Ink } = imports.ink;

let printer = new Ink.Printer();
printer.print('Hello World');
```

#### [advanced.js](https://raw.githubusercontent.com/Rafostar/gjs-ink/other/examples/advanced.js)
```javascript
const { Ink } = imports.ink;

let green = new Ink.Printer({
    color: Ink.TextColor.GREEN
});

let bgLightBlue = new Ink.Printer({
    font: Ink.TextFont.REVERSE,
    color: Ink.TextColor.LIGHT_BLUE
});

let blinkYellow = new Ink.Printer({
    font: Ink.TextFont.BLINK,
    color: Ink.TextColor.YELLOW
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

various.font = Ink.TextFont.UNDERLINE;
various.print('object', 'values', 'can', 'be', 'changed', 'at', 'runtime');

let lightMagenta = new Ink.Printer({
    color: Ink.TextColor.LIGHT_MAGENTA
});

lightMagenta.print(
`This single
text is printed
in multiple lines`
);

various.color = Ink.TextColor.LIGHT_BROWN;
print(
    green.getPainted('can also return'),
    various.getPainted('painted text'),
    bgLightBlue.getPainted('for use with standard "print()"')
);
```

#### [test.js](https://raw.githubusercontent.com/Rafostar/gjs-ink/other/examples/test.js)
```javascript
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
```

## Donation
If you like my work please support it by buying me a cup of coffee :-)

[![PayPal](https://github.com/Rafostar/gnome-shell-extension-cast-to-tv/wiki/images/paypal.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=TFVDFD88KQ322)
