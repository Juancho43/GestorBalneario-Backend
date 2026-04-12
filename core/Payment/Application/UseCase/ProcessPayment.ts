import { IUseCase } from '../../../common/Application/IUseCase';
import { CreatePaymentCommand } from '../Command/CreatePaymentCommand';
import { Payment } from '../../Model/Payment';
import { CreatePaymentDAO } from '../../Model/DAO/CreatePaymentDAO';
import { StringObject } from '../../../common/Model/StringObject';
import { PaymentType } from '../../Model/PaymentType';
import { UUID } from '../../../common/Model/UUID';
import { Money } from '../../Model/Money';
import { Timestamps } from '../../../common/Model/Timestamps';
import { SoftDelete } from '../../../common/Model/SoftDelete';
import { GetInvoiceDAO } from '../../../Invoice/Model/DAO/GetInvoiceDAO';
import { EntityNotFoundError } from '../../../common/Model/Errors/EntityNotFound';
import { Invoice } from '../../../Invoice/Model/Invoice';
import { EventPublisher } from '../../../common/Application/EventPublisher';
import { PaymentCreatedEvent } from '../../Model/PaymentCreatedEvent';

export class ProcessPayment implements IUseCase<CreatePaymentCommand, Payment> {
  constructor(
    private dao: CreatePaymentDAO,
    private invoiceDAO: GetInvoiceDAO,
    private eventBus: EventPublisher,
  ) {}

  async execute(command: CreatePaymentCommand): Promise<Payment> {
    const invoice = await this.invoiceDAO.get(command.invoiceId);
    if (!invoice) {
      throw new EntityNotFoundError(Invoice.name, command.invoiceId);
    }
    const money = Money.create(
      command.amount,
      command.changeType,
      command.currency,
    );

    const payment = Payment.create(
      UUID.create(),
      new Date(command.date),
      PaymentType.create(command.type),
      money,
      StringObject.create(command.description ?? command.date.toISOString()),
      Timestamps.create(command.date),
      SoftDelete.empty(),
    );
    invoice.addPayment(payment);
    await this.dao.save(payment, invoice);
    this.eventBus.publish(
      new PaymentCreatedEvent(
        payment.id.value,
        invoice.id.value,
        invoice.calculateDebt(),
        new Date(),
      ),
    );
    return payment;
  }
}
