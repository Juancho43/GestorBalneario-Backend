import { Service } from '../../core/Service/Model/Service';
import { UUID } from '../../core/common/Model/UUID';
import { StringObject } from '../../core/common/Model/StringObject';
import { MoneyMother } from './MoneyMother';
import { Timestamps } from '../../core/common/Model/Timestamps';
import { SoftDelete } from '../../core/common/Model/SoftDelete';
import { Money } from '../../core/Payment/Model/Money';

export class ServiceMother {
    static create(overrides: Partial<{
        id: UUID;
        seasonId: UUID;
        name: StringObject;
        price: Money;
        timestamp: Timestamps;
        softDelete: SoftDelete;
    }> = {}): Service {

        // Definimos los valores por defecto "de éxito"
        const defaults = {
            id: overrides.id ?? UUID.create(),
            seasonId: overrides.seasonId ?? UUID.create(),
            name: overrides.name ?? StringObject.create('Carpado Enero Full'),
            price: overrides.price ?? Money.create(1500),
            timestamp: overrides.timestamp ?? Timestamps.create(),
            softDelete: overrides.softDelete ?? SoftDelete.empty(),
        };

        return Service.create(
            defaults.id,
            defaults.seasonId,
            defaults.name,
            defaults.price,
            defaults.timestamp,
            defaults.softDelete
        );
    }

}
