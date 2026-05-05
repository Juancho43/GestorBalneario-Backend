import {CommandBus, EventsHandler, IEventHandler} from '@nestjs/cqrs';
import {ReservationCreatedEvent} from '../../../core/Reservation/Model/ReservationCreatedEvent';
import {Logger} from '@nestjs/common';
import {AddInvoiceItemCommand} from '../../../core/Invoice/Application/Commands/AddInvoiceItemCommand';

@EventsHandler(ReservationCreatedEvent)
export class ReservationCreatedHandler implements IEventHandler<ReservationCreatedEvent> {
  private readonly logger = new Logger(ReservationCreatedHandler.name);
  constructor(private commandBus: CommandBus) {}

  handle(event: ReservationCreatedEvent) {
    this.logger.debug('Handling reservation created event:', event);
    const command = new AddInvoiceItemCommand(
      event.aggregateId,
      event.clientId,
      event.serviceId,
      event.price,
      event.date,
      event.description,
      'RESERVATION',
    );
    this.commandBus.execute(command);
  }
}
