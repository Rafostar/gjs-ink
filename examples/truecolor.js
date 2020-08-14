let { Ink } = imports.ink;

let printer = new Ink.Printer();

for(let i = 0; i <= 2; i++) {
    let str = '';
    let array = [0, 0, 0];
    array[i] = 255;

    while(array[i] >= 0) {
        printer.background = Ink.colorFromRGB(array);
        str += printer.getPainted(' ');
        array[i] -= 4;
    }
    print(str);
}
