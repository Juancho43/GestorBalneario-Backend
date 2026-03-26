import { v4 as uuidv4, validate as validateUuid } from 'uuid';

/**
 * UUID
 * Garantiza que cualquier ID en el sistema sea un UUID válido.
 */
export class UUID {
    private readonly _value: string;

    private constructor(value: string) {
        this.validate(value);
        this._value = value;
    }

    /**
     * Factory method para crear un nuevo ID (Generación)
     */
    static create(): UUID {
        return new UUID(uuidv4());
    }

    /**
     * Factory method para reconstruir un ID existente (Persistencia/SQLite)
     */
    static restore(value: string): UUID {
        return new UUID(value);
    }

    private validate(value: string): void {
        if (!validateUuid(value)) {
            throw new Error(`Invalid UniqueIdentifier: ${value}. Debe ser un UUID válido.`);
        }
    }

    get value(): string {
        return this._value;
    }

    equals(other: UUID): boolean {
        return this._value === other.value;
    }
}