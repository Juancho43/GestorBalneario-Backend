/**
 * Timestamps Value Object
 * Encapsula la lógica de creación y actualización de fechas de las entidades.
 * Es inmutable por diseño.
 */
export class Timestamps {
    private readonly _createdAt: Date;
    private readonly _updatedAt: Date;

    private constructor(createdAt: Date, updatedAt: Date) {
        this._createdAt = Object.freeze(new Date(createdAt));
        this._updatedAt = Object.freeze(new Date(updatedAt));
    }

    // Factory method para nuevas entidades
    static create(date?:Date): Timestamps {
        let now = new Date();
        if (date){
            now = date;
        }
        return new Timestamps(now, now);
    }

    // Factory method para reconstruir desde la base de datos (Persistencia)
    static restore(createdAt: Date, updatedAt: Date): Timestamps {
        return new Timestamps(createdAt, updatedAt);
    }

    // Genera un nuevo objeto con la fecha de actualización al día
    update(): Timestamps {
        return new Timestamps(this._createdAt, new Date());
    }

    get createdAt(): Date {
        return new Date(this._createdAt);
    }

    get updatedAt(): Date {
        return new Date(this._updatedAt);
    }

    // Método de utilidad para comparar (Lógica de Value Object)
    equals(other: Timestamps): boolean {
        return (
            this._createdAt.getTime() === other.createdAt.getTime() &&
            this._updatedAt.getTime() === other.updatedAt.getTime()
        );
    }
}