/**
 * SoftDelete Value Object
 * Representa el estado de eliminación lógica de una entidad.
 */
export class SoftDelete {
    private readonly _deletedAt: Date | null;

    private constructor(deletedAt: Date | null) {
        this._deletedAt = deletedAt ? Object.freeze(new Date(deletedAt)) : null;
    }

    // Estado inicial: no eliminado
    static empty(): SoftDelete {
        return new SoftDelete(null);
    }

    // Rehidratar desde la base de datos (SQLite)
    static restore(deletedAt: Date | null): SoftDelete {
        return new SoftDelete(deletedAt);
    }

    // Genera la acción de eliminar
    apply(): SoftDelete {
        return new SoftDelete(new Date());
    }

    // Revierte la eliminación (si fuera necesario)
    undo(): SoftDelete {
        return new SoftDelete(null);
    }

    get value(): Date | null {
        return this._deletedAt ? new Date(this._deletedAt) : null;
    }

    get isDeleted(): boolean {
        return this._deletedAt !== null;
    }

    // Comparación lógica
    equals(other: SoftDelete): boolean {
        if (this._deletedAt === null && other.value === null) return true;
        if (this._deletedAt === null || other.value === null) return false;
        return this._deletedAt.getTime() === other.value.getTime();
    }
}