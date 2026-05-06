/**
 * SoftDelete Value Object
 * Representa el estado de eliminación lógica de una entidad.
 */
export class SoftDelete {
  private  _deletedAt: Date | null;

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

  apply() {
    this._deletedAt = new Date();
  }

  undo() {
    this._deletedAt = null;
  }

  get value(): Date | null {
    return this._deletedAt ? new Date(this._deletedAt) : null;
  }

  get isDeleted(): boolean {
    return this._deletedAt !== null;
  }
}
