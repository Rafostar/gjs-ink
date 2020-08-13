const TERM_ESC = '\x1b[';
const TERM_RESET = '0m';

var TextFont = {
    VARIOUS: null,
    REGULAR: 0,
    BOLD: 1,
    DIM: 2,
    ITALIC: 3,
    UNDERLINE: 4,
    BLINK: 5,
    REVERSE: 7,
    HIDDEN: 8,
    STRIKEOUT: 9,
};

var TextColor = {
    VARIOUS: null,
    DEFAULT: 39,
    BLACK: 30,
    RED: 31,
    GREEN: 32,
    YELLOW: 33,
    BLUE: 34,
    MAGENTA: 35,
    CYAN: 36,
    LIGHT_GRAY: 37,
    DARK_GRAY: 90,
    LIGHT_RED: 91,
    LIGHT_GREEN: 92,
    LIGHT_YELLOW: 93,
    LIGHT_BLUE: 94,
    LIGHT_MAGENTA: 95,
    LIGHT_CYAN: 96,
    WHITE: 97,
    BROWN: '38;5;52',
    LIGHT_BROWN: '38;5;130',
    PINK: '38;5;205',
    LIGHT_PINK: '38;5;211',
    ORANGE: '38;5;208',
    LIGHT_ORANGE: '38;5;214',
    SALMON: '38;5;209',
    LIGHT_SALMON: '38;5;216',
};

/* BackgroundColor = TextColor + 10 */
var BackgroundColor = {};
for(let color in TextColor) {
    let value = TextColor[color];
    if(typeof value === 'string') {
        value = value.split(';');
        value[0] = Number(value[0]) + 10;
    }
    BackgroundColor[color] = (value > 0)
        ? value + 10
        : (Array.isArray(value))
        ? value.join(';')
        : value;
}

var Printer = class
{
    constructor(opts)
    {
        opts = opts || {};

        this.font = (typeof opts.font != 'undefined')
            ? opts.font : TextFont.REGULAR;

        this.color = (typeof opts.color != 'undefined')
            ? opts.color : TextColor.VARIOUS;

        this.background = (typeof opts.background != 'undefined')
            ? opts.background : BackgroundColor.DEFAULT;
    }

    print()
    {
        print(this._getPaintedArgs(arguments));
    }

    printerr()
    {
        printerr(this._getPaintedArgs(arguments));
    }

    getPainted()
    {
        return this._getPaintedArgs(arguments);
    }

    _getPaintedArgs(args)
    {
        let str = '';

        for(let arg of args) {
            if(Array.isArray(arg))
                arg = arg.join(',');

            let painted = this._getPaintedString(arg);
            str += (str.length) ? ' ' + painted : painted;
        }

        return str;
    }

    _getValueFromText(text, obj)
    {
        obj = obj || TextColor;

        let arr = Object.keys(obj);
        let len = text.length;
        let total = 0;

        while(len--)
            total += Number(text.charCodeAt(len).toString(10));

        /* Return a value excluding first (null) */
        return obj[arr[total % (arr.length - 1) + 1]];
    }

    _getPaintedString(text)
    {
        let str = TERM_ESC;

        str += (this.font != TextFont.VARIOUS && typeof this.font != 'undefined')
            ? this.font
            : this._getValueFromText(text, TextFont);
        str += ';';
        str += (this.color != TextColor.VARIOUS && typeof this.color != 'undefined')
            ? this.color
            : this._getValueFromText(text, TextColor);
        str += ';';
        str += (this.background != BackgroundColor.VARIOUS && typeof this.background != 'undefined')
            ? this.background
            : this._getValueFromText(text, BackgroundColor);
        str += 'm';

        return (str + text + TERM_ESC + TERM_RESET);
    }
}
