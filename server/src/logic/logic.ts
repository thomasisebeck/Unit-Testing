import {ComputationStack, Operations} from "./operations";

export class Calculator {
    constructor() {
    }


    public getResult(stack: ComputationStack[]): string {

        if (stack.length == 0)
            throw "Cannot calculate with len 0";


        if (stack[stack.length - 1].operation != null)
            throw "Calculation must end with an empty operation";

        let result: string = stack[0].value;

        for (let i = 1; i < stack.length; i++) {
            const c: string = stack[i].value;
            const op: Operations | null = stack[i - 1].operation;

            switch (op) {
                case Operations.ADD:
                    result = this.add(result, c);
                    break;
                case Operations.DIVIDE:
                    result = this.divide(result, c);
                    break;
                case Operations.MULTIPLY:
                    result = this.multiply(result, c);
                    break;
                case Operations.SUBTRACT:
                    result = this.subtract(result, c);
            }
        }

        return result;
    }

    public add(first: string, second: string): string {
        return this.toHex(this.toDec(first) + this.toDec(second));
    }

    public subtract(first: string, second: string): string {
        return this.toHex(this.toDec(first) - this.toDec(second));
    }

    public multiply(first: string, second: string): string {
        return this.toHex(this.toDec(first) * this.toDec(second));
    }

    public divide(first: string, second: string): string {
        if (second == "0")
            throw "undefined";
        return this.toHex(Math.floor(this.toDec(first) / this.toDec(second)));
    }

    public toHex(dec: number): string {
        if (dec < 0)
            throw new Error("Cannot convert negatives");

        let result = "";

        const hexDigits = "0123456789ABCDEF";
        while (dec > 0) {
            const remainder = dec % 16;
            result = hexDigits[remainder] + result;
            dec = Math.floor(dec / 16);
        }
        return result;
    }

    public toDec(hex: string): number {
        if (hex.length === 0)
            throw "invalid hex number"

        const hexDigits = "0123456789ABCDEF";

        let value = 0;

        for (let i = 0; i < hex.length; i++) {
            const currentCar = hex[i];
            const position = hexDigits.indexOf(currentCar);
            if (position == -1)
                throw "invalid hex digit found"
            //goes up in multiples of 16 each time
            //it gets higher up
            value = 16 * value + position;
        }
        return value;
    }

}

export default Calculator;