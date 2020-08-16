let { Ink } = imports.ink;

let printer = new Ink.Printer();

for(let i = 0; i <= 2; i++) {
    let str = '';
    let step = 4;
    let array = [0, 0, 0];
    array[i] = 255;

    while(array[i] >= step) {
        printer.background = Ink.colorFromRGB(array);
        str += printer.getPainted(' ');
        array[i] -= step;
    }
    print(str);
}
