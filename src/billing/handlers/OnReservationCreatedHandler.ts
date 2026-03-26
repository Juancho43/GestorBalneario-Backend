import {CommandBus, EventsHandler, IEventHandler} from "@nestjs/cqrs";
import {ReservationCreatedEvent} from "../../../core/Reservation/Application/Events/ReservationCreatedEvent";
import {AddInvoiceItemCommand} from "../../../core/Billing/Application/DTO/AddInvoiceItemCommand";
import {Logger} from "@nestjs/common";

@EventsHandler(ReservationCreatedEvent)
export class ReservationCreatedHandler implements IEventHandler<ReservationCreatedEvent> {
    private readonly logger = new Logger(ReservationCreatedHandler.name);
    constructor(private  commandBus: CommandBus) {
    }

    handle(event: ReservationCreatedEvent) {
        this.logger.log('Handling reservation created event:',event);
        const command = new AddInvoiceItemCommand();
        command.clientId=event.clientId;
        command.aggregateId=event.aggregateId;
        command.price = event.price;
        command.description = event.description;
        command.serviceId = event.serviceId;
        command.date = event.date;
        this.commandBus.execute(command);
    }
}