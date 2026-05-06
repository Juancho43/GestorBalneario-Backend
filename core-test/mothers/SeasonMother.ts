import {Season} from '../../core/Season/Model/Season';
import {UUID} from '../../core/common/Model/UUID';
import {StringObject} from '../../core/common/Model/StringObject';
import {Timestamps} from '../../core/common/Model/Timestamps';
import {SoftDelete} from '../../core/common/Model/SoftDelete';

export class SeasonMother {
  static create(
    overrides: Partial<{
      id: UUID;
      isActive: boolean;
      startDate: Date;
      endDate: Date;
      name: StringObject;
      timestamps: Timestamps;
      softDelete: SoftDelete;
    }> = {},
  ): Season {
    // Definimos fechas coherentes por defecto (ej: Verano 2026)
    const defaultStart = new Date('2026-12-01');
    const defaultEnd = new Date('2027-03-31');

    const defaults = {
      id: overrides.id ?? UUID.create(),
      isActive: overrides.isActive ?? false,
      startDate: overrides.startDate ?? defaultStart,
      endDate: overrides.endDate ?? defaultEnd,
      name: overrides.name ?? StringObject.create('Temporada Alta 2026'),
      timestamps: overrides.timestamps ?? Timestamps.create(),
      softDelete: overrides.softDelete ?? SoftDelete.empty(),
    };

    // Invocamos tu método estático que contiene la validación de fechas
    return Season.create(
      defaults.id,
      defaults.isActive,
      defaults.startDate,
      defaults.endDate,
      defaults.name,
      defaults.timestamps,
      defaults.softDelete,
    );
  }
}
