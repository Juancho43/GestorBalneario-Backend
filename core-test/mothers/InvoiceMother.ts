import {Invoice} from '../../core/Invoice/Model/Invoice';
import {UUID} from '../../core/common/Model/UUID';
import {Timestamps} from '../../core/common/Model/Timestamps';
import {SoftDelete} from '../../core/common/Model/SoftDelete';

export class InvoiceMother {
  static create(
    overrides: Partial<{
      id: UUID;
      date: Date;
      clientId: UUID;
      timestamps: Timestamps;
      softDelete: SoftDelete;
    }> = {},
  ): Invoice {
    // Valores por defecto para una factura nueva
    const defaults = {
      id: overrides.id ?? UUID.create(),
      date: overrides.date ?? new Date(),
      clientId: overrides.clientId ?? UUID.create(),
      timestamps: overrides.timestamps ?? Timestamps.create(),
      softDelete: overrides.softDelete ?? SoftDelete.empty(),
    };

    return Invoice.create(
      defaults.id,
      defaults.date,
      defaults.clientId,
      defaults.timestamps,
      defaults.softDelete,
    );
  }
}
