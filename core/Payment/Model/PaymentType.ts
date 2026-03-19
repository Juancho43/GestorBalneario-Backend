export enum PaymentMethod {
    CASH = 'CASH',
    TRANSFER = 'TRANSFER',
    CREDIT_CARD = 'CREDIT_CARD',
    CHECK = 'CHECK',
    USD_DOLLAR = 'USD_DOLLAR',
    CRYPTO = 'CRYPTO',
    OTHER = 'OTHER'
}

export class PaymentType {
    private readonly value: PaymentMethod;

    private constructor(value: string) {
        this.validate(value);
        this.value = value as PaymentMethod;
    }
    static create(value: string): PaymentType {
        return new PaymentType(value);
    }
    private validate(value: string): void {
        if (!Object.values(PaymentMethod).includes(value as PaymentMethod)) {
            throw new Error(`Invalid payment method: ${value}`);
        }
    }

    /**
     * Returns true if the payment method requires a currency exchange rate
     * (e.g., USD or Crypto) to calculate the final amount in local currency.
     */
    public requiresExchangeRate(): boolean {
        return [PaymentMethod.USD_DOLLAR, PaymentMethod.CRYPTO].includes(this.value);
    }

    /**
     * Returns true if the payment is digital or traceable
     * (useful for internal auditing/accounting).
     */
    public isTraceable(): boolean {
        return [
            PaymentMethod.TRANSFER,
            PaymentMethod.CREDIT_CARD,
            PaymentMethod.CRYPTO
        ].includes(this.value);
    }

    public getValue(): PaymentMethod {
        return this.value;
    }

    public equals(other: PaymentType): boolean {
        return this.value === other.getValue();
    }

    public toString(): string {
        return this.value.toString();
    }
}