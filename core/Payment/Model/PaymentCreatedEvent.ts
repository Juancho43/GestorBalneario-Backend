import { BaseDomainEvent } from '../../common/Application/BaseDomainEvent';

export class PaymentCreatedEvent extends BaseDomainEvent {
  constructor(
    paymentId: string,
    public invoiceId: string,
    public currentDebt: number,
    public readonly date: Date,
  ) {
    super(paymentId, 'PaymentCreatedEvent');
  }
}
