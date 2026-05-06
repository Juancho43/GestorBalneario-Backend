import {Payment} from '../../core/Payment/Model/Payment';
import {UUID} from '../../core/common/Model/UUID';
import {PaymentType} from '../../core/Payment/Model/PaymentType';
import {StringObject} from '../../core/common/Model/StringObject';
import {Money} from '../../core/Payment/Model/Money';
import {Timestamps} from '../../core/common/Model/Timestamps';
import {SoftDelete} from '../../core/common/Model/SoftDelete';
import {MoneyMother} from './MoneyMother';
import {PaymentTypeMother} from './PaymentTypeMother';

export class PaymentMother {
  static create(
    overrides: Partial<{
      id: UUID;
      date: Date;
      type: PaymentType;
      money: Money;
      description: StringObject;
      timestamp: Timestamps;
      softDelete: SoftDelete;
    }> = {},
  ): Payment {
    const defaults = {
      id: overrides.id ?? UUID.create(),
      date: overrides.date ?? new Date(),
      type: overrides.type ?? PaymentTypeMother.create(),
      money: overrides.money ?? MoneyMother.create(),
      description:
        overrides.description ?? StringObject.create('Pago de carpa Enero'),
      timestamp: overrides.timestamp ?? Timestamps.create(),
      softDelete: overrides.softDelete ?? SoftDelete.empty(),
    };

    return Payment.create(
      defaults.id,
      defaults.date,
      defaults.type,
      defaults.money,
      defaults.description,
      defaults.timestamp,
      defaults.softDelete,
    );
  }
}
