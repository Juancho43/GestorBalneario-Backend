import {StringObject} from '../../core/common/Model/StringObject';
import {UUID} from '../../core/common/Model/UUID';
import {EmailObject} from '../../core/common/Model/EmailObject';
import {Timestamps} from '../../core/common/Model/Timestamps';
import {SoftDelete} from '../../core/common/Model/SoftDelete';
import {Client} from '../../core/Client/Model/Client';

export class ClientMother {
  static create(
    overrides: Partial<{
      id: UUID;
      name: StringObject;
      email: EmailObject;
      phone: StringObject;
      timestamp: Timestamps;
      softDelete: SoftDelete;
    }> = {},
  ): Client {
    // Valores por defecto para un cliente estándar del balneario
    const defaults = {
      id: overrides.id ?? UUID.create(),
      name: overrides.name ?? StringObject.create('Juan Pérez'),
      email: overrides.email ?? EmailObject.create('juan.perez@test.com'),
      phone: overrides.phone ?? StringObject.create('+5492230001111'),
      timestamp: overrides.timestamp ?? Timestamps.create(),
      softDelete: overrides.softDelete ?? SoftDelete.empty(),
    };

    return Client.create(
      defaults.id,
      defaults.name,
      defaults.email,
      defaults.phone,
      defaults.timestamp,
      defaults.softDelete,
    );
  }
}
