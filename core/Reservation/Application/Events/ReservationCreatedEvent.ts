import {BaseDomainEvent} from "../../../common/Application/BaseDomainEvent";

export class ReservationCreatedEvent extends BaseDomainEvent {
    constructor(
        reservationId: string,
        public readonly clientId: string,
        public readonly serviceId: string,
        public readonly price:number,
        public readonly date:Date,
        public readonly description:string,
    ) {
        super(reservationId, 'shadow.reservation.created');
    }
}