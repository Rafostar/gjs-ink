# ink
[![License](https://img.shields.io/github/license/Rafostar/ink.svg)](https://github.com/Rafostar/ink/blob/master/COPYING)
[![Donate](https://img.shields.io/badge/Donate-PayPal-blue.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=TFVDFD88KQ322)
[![Donate](https://img.shields.io/badge/Donate-PayPal.Me-lightgrey.svg)](https://www.paypal.me/Rafostar)
[![Twitter](https://img.shields.io/twitter/url/https/github.com/Rafostar/ink.svg?style=social)](https://twitter.com/intent/tweet?text=Wow:&url=https%3A%2F%2Fgithub.com%2FRafostar%2Fink)

Terminal text color printing and styling for GJS.

<p align="center">
<img src="https://raw.githubusercontent.com/Rafostar/ink/media/images/promo.png">
</p>

<br>Print text and images in terminal with <b>Ink</b> using up to <b>16 million</b> colors palette!

<p align="center">
<img src="https://raw.githubusercontent.com/Rafostar/ink/media/images/truecolor.png">
<img src="https://raw.githubusercontent.com/Rafostar/ink/media/images/mario.png">
</p>

## Installation
Just download this repository contents to `/usr/share/gjs-1.0/ink` folder.
```
git clone https://github.com/Rafostar/ink.git /usr/share/gjs-1.0/ink
```
Alternatively download it to `ink` folder in any other location and export that location path with `GJS_PATH` environment variable.

## Manual
Instructions how to use with full list of available options and functions can be found in [wiki](https://github.com/Rafostar/ink/wiki).

## Examples
Here are some usage examples for each included module. More can be found inside [examples folder](https://github.com/Rafostar/ink/tree/master/examples) in this repository.

### [Ink.Printer](https://github.com/Rafostar/ink/wiki/Ink-Classes#inkprinter)
#### [basic.js](https://raw.githubusercontent.com/Rafostar/ink/master/examples/basic.js)
```shell
gjs ./examples/basic.js
```
```javascript
const { Ink } = imports.ink;

let printer = new Ink.Printer({
    font: Ink.Font.BOLD,
    color: Ink.Color.GREEN,
    background: Ink.Color.DEFAULT
});

printer.print('Hello World');
```

#### [advanced.js](https://raw.githubusercontent.com/Rafostar/ink/master/examples/advanced.js)
```shell
gjs ./examples/advanced.js
```
```javascript
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
```

### [Photo.Scanner](https://github.com/Rafostar/ink/wiki/Photo-Classes#photoscanner)
```shell
gjs ./examples/mario.js
```
```javascript
const { Ink, Photo } = imports.ink;

let scanner = new Photo.Scanner({ size_y: 16 });
let image = scanner.scan('./examples/mario.png');

let printer = new Ink.Printer();
printer.print(image);
```

## Donation
If you like my work please support it by buying me a cup of coffee :-)

[![PayPal](https://github.com/Rafostar/gnome-shell-extension-cast-to-tv/wiki/images/paypal.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=TFVDFD88KQ322)
