import { Service } from '../../core/Service/Model/Service';
import { UUID } from '../../core/common/Model/UUID';
import { StringObject } from '../../core/common/Model/StringObject';
import { MoneyMother } from '../Payment/MoneyMother';
import { Timestamps } from '../../core/common/Model/Timestamps';
import { SoftDelete } from '../../core/common/Model/SoftDelete';
import { Money } from '../../core/Payment/Model/Money';

export class ServiceMother {
    static create(
        id: UUID = UUID.create(),
        name: StringObject = StringObject.create('Default Service'),
        price: Money = MoneyMother.create(100),
        timestamp: Timestamps = Timestamps.create(),
        softDelete: SoftDelete = SoftDelete.empty(),
    ): Service {
        return Service.create(id, name, price, timestamp, softDelete);
    }

    static withPrice(price: Money): Service {
        return this.create(undefined, undefined, price);
    }

    static withName(name: StringObject): Service {
        return this.create(undefined, name);
    }
}
