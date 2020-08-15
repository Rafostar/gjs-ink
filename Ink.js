const TERM_ESC = '\x1B[';
const TERM_RESET = '0m';

var maxTransparency = 128;

var Font = {
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

var Color = {
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
    BROWN: colorFrom256(52),
    LIGHT_BROWN: colorFrom256(130),
    PINK: colorFrom256(205),
    LIGHT_PINK: colorFrom256(211),
    ORANGE: colorFrom256(208),
    LIGHT_ORANGE: colorFrom256(214),
    SALMON: colorFrom256(209),
    LIGHT_SALMON: colorFrom256(216),
};

function colorFrom256(number)
{
    return _getCustomCode([38, 5, number || 0]);
}

function colorFromRGB(R, G, B, A)
{
    if(Array.isArray(R)) {
        A = (R.length > 3) ? R[3] : 255;
        B = (R.length > 2) ? R[2] : 0;
        G = (R.length > 1) ? R[1] : 0;
        R = (R.length > 0) ? R[0] : 0;
    }

    if(typeof A !== 'undefined' && A <= maxTransparency)
        return Color.DEFAULT;

    R = R || 0;
    G = G || 0;
    B = B || 0;

    return _getCustomCode([38, 2, R, G, B]);
}

function colorFromHex(R, G, B, A)
{
    if((Array.isArray(R))) {
        A = (R.length > 3) ? R[3] : 255;
        R = R.join('');
    }

    if(typeof A !== 'undefined' && A <= maxTransparency)
        return Color.DEFAULT;

    let str = (typeof G === 'undefined')
        ? String(R)
        : (typeof B !== 'undefined')
        ? String(R) + String(G) + String(B)
        : String(R) + String(G);

    if(str.includes('#'))
        str = str.split('#')[1];

    let colorInt = parseInt(str, 16);
    let u8array = new Uint8Array(3);

    u8array[2] = colorInt;
    u8array[1] = colorInt >> 8;
    u8array[0] = colorInt >> 16;

    return colorFromRGB(Array.from(u8array));
}

function colorFromText(text)
{
    let value = _stringToDec(text);

    /* Returns color from 1 to 221 every 10 */
    return colorFrom256((value % 23) * 10 + 1);
}

function _getCustomCode(arr)
{
    return arr.join(';');
}

function _stringToDec(str)
{
    str = str || '';

    let len = str.length;
    let total = 0;

    while(len--)
        total += Number(str.charCodeAt(len).toString(10));

    return total;
}

var Printer = class
{
    constructor(opts)
    {
        opts = opts || {};

        const defaults = {
            font: Font.REGULAR,
            color: Color.DEFAULT,
            background: Color.DEFAULT
        };

        for(let def in defaults) {
            this[def] = (typeof opts[def] !== 'undefined')
                ? opts[def] : defaults[def];
        }
    }

    print()
    {
        (this._getIsImage(arguments))
            ? this._printImage(arguments[0], 'stdout')
            : print(this._getPaintedArgs(arguments));
    }

    printerr()
    {
        (this._getIsImage(arguments))
            ? this._printImage(arguments[0], 'stderr')
            : printerr(this._getPaintedArgs(arguments));
    }

    getPainted()
    {
        return (this._getIsImage(arguments))
            ? this._printImage(arguments[0], 'return')
            : this._getPaintedArgs(arguments);
    }

    get background()
    {
        return this._background;
    }

    set background(value)
    {
        let valueType = (typeof value);

        if(valueType === 'string') {
            if(value.includes(';')) {
                value = value.split(';');
                value[0] = 48;
            }
            else
                value = Number(value);
        }
        this._background = (valueType === 'object')
            ? null
            : (Array.isArray(value))
            ? _getCustomCode(value)
            : (value < 40 || value >= 90 && value < 100)
            ? value + 10
            : value;
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

    _fontFromText(text)
    {
        let arr = Object.keys(Font);
        let value = _stringToDec(text);

        /* Return a font excluding first (null) */
        return obj[arr[value % (arr.length - 1) + 1]];
    }

    _getPaintedString(text)
    {
        let str = TERM_ESC;

        for(let option of ['font', 'color', '_background']) {
            let optionType = (typeof this[option]);
            str += (optionType === 'number' || optionType === 'string')
                ? this[option]
                : (Array.isArray(this[option]))
                ? _getCustomCode(this[option])
                : (option === 'font')
                ? this._fontFromText(text)
                : colorFromText(text);

            str += (option === '_background') ? 'm' : ';';
        }

        return (str + text + TERM_ESC + TERM_RESET);
    }

    _getIsImage(args)
    {
        if(args.length !== 1)
            return false;

        let arg = args[0];
        let argType = (typeof args[0]);

        if(argType === 'number' || argType === 'string')
            return false;

        if(!Array.isArray(arg))
            return false;

        let depth = 2;
        while(depth--) {
            arg = arg[0];
            if(!Array.isArray(arg))
                return false;
        }

        return arg.some(val => val !== 'number');
    }

    _printImage(pixelsArr, output)
    {
        let total = '';
        let prevColor = this.color;
        let prevBackground = this._background;

        for(let row of pixelsArr) {
            let paintedLine = '';

            for(let pixel of row) {
                this.color = colorFromRGB(pixel);
                this.background = this.color;
                paintedLine += this.getPainted('  ');
            }

            switch(output) {
                case 'stderr':
                    printerr(paintedLine);
                    break;
                case 'return':
                    total += paintedLine + '\n';
                    break;
                default:
                    print(paintedLine);
                    break;
            }
        }

        this.color = prevColor;
        this._background = prevBackground;

        return total;
    }
}
