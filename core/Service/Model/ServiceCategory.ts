export enum ServiceType{
    RESERVATION = 'RESERVATION',
    DISCOUNT = 'DISCOUNT',
    RECHARGE = 'RECHARGE',
    OTHER = 'OTHER'
}
export class ServiceCategory {
    private readonly value: ServiceType;
    private constructor(value: string) {
        this.validate(value);
        this.value = value as ServiceType;
    }
    static create(value: string): ServiceCategory {
        return new ServiceCategory(value);
    }

    private validate(value: string): void {
        if (!Object.values(ServiceType).includes(value as ServiceType)) {
            throw new Error(`Invalid service category: ${value}`);
        }
    }
    public getValue(): ServiceType {
        return this.value;
    }

    public equals(other: ServiceCategory): boolean {
        return this.value === other.getValue();
    }

    public toString(): string {
        return this.value.toString();
    }
}