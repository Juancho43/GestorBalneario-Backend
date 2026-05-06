import {PaymentMethod, PaymentType,} from '../../core/Payment/Model/PaymentType';

export class PaymentTypeMother {
  static create(value?: string): PaymentType {
    // Default: CASH (Efectivo)
    return PaymentType.create(value ?? PaymentMethod.CASH);
  }

  static crypto(): PaymentType {
    return this.create(PaymentMethod.CRYPTO);
  }

  static usd(): PaymentType {
    return this.create(PaymentMethod.USD_DOLLAR);
  }
}
