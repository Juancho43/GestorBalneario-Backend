export class StringObject {
    private readonly value: string;

    private constructor(value: string, pattern: RegExp = /^\\S(?:[\\sS]*\\S)?$/) {
        if (!pattern.test(value)) {
            throw new Error(`Invalid string format.`);
        }

        this.value = value;
    }
    static create(value: string, pattern?: RegExp): StringObject {
        return new StringObject(value, pattern);
    }
    public getValue(): string {
        return this.value;
    }
}