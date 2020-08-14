const TERM_ESC = '\x1B[';
const TERM_RESET = '0m';

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
    return getCustomCode([38, 5, number || 0]);
}

function colorFromRGB(R, G, B)
{
    if(Array.isArray(R)) {
        B = R[2];
        G = R[1];
        R = R[0];
    }

    R = R || 0;
    G = G || 0;
    B = B || 0;

    return getCustomCode([38, 2, R, G, B]);
}

function getCustomCode(arr)
{
    return arr.join(';');
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

    get background()
    {
        return this._background;
    }

    set background(value)
    {
        if(typeof value === 'string') {
            value = value.split(';');
            value[0] = Number(value[0]) + 10;
        }
        this._background = (value > 0)
            ? value + 10
            : (Array.isArray(value))
            ? getCustomCode(value)
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

    _getValueFromText(text, obj)
    {
        obj = obj || Color;

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

        for(let option of ['font', 'color', '_background']) {
            str += (typeof this[option] === 'number' || typeof this[option] === 'string')
                ? this[option]
                : (Array.isArray(this[option]))
                ? getCustomCode(this[option])
                : (option === 'font')
                ? this._getValueFromText(text, Font)
                : this._getValueFromText(text, Color);

            str += (option === '_background') ? 'm' : ';';
        }

        return (str + text + TERM_ESC + TERM_RESET);
    }
}
