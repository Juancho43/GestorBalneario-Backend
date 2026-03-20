export class Money {
    private constructor(
        private readonly _amount: number,
        private readonly _exchangeRate: number,
        private readonly _currency: string // Ejemplo: 'USD', 'ARS'
    ) {
        this.validate(this._amount);
        this.validate(this._exchangeRate);
    }

    public static create(amount: number, exchangeRate: number = 1, currency: string = 'ARS'): Money {
        return new Money(amount, exchangeRate, currency);
    }

    private validate(value: number): void {
        if (value <= 0) throw new Error("Los valores monetarios deben ser positivos.");
    }

    public get finalAmount(): number {
        return this._amount * this._exchangeRate;
    }

    get amount(): number { return this._amount; }
    get exchangeRate(): number { return this._exchangeRate; }
    get currency(): string { return this._currency; }
}