import { v4 as uuidv4, validate as validateUuid } from 'uuid';

/**
 * UniqueIdentifier Value Object
 * Garantiza que cualquier ID en el sistema sea un UUID válido.
 */
export class UniqueIdentifier {
    private readonly _value: string;

    private constructor(value: string) {
        this.validate(value);
        this._value = value;
    }

    /**
     * Factory method para crear un nuevo ID (Generación)
     */
    static create(): UniqueIdentifier {
        return new UniqueIdentifier(uuidv4());
    }

    /**
     * Factory method para reconstruir un ID existente (Persistencia/SQLite)
     */
    static restore(value: string): UniqueIdentifier {
        return new UniqueIdentifier(value);
    }

    private validate(value: string): void {
        if (!validateUuid(value)) {
            throw new Error(`Invalid UniqueIdentifier: ${value}. Debe ser un UUID válido.`);
        }
    }

    get value(): string {
        return this._value;
    }

    /**
     * Comparación lógica entre Value Objects
     */
    equals(other: UniqueIdentifier): boolean {
        return this._value === other.value;
    }

    toString(): string {
        return this._value;
    }
}