import {UUID} from "../Model/UUID";
import {IDomainEvent} from "./IDomainEvent";

export abstract class BaseDomainEvent implements IDomainEvent {
    public readonly occurredOn: Date;
    public readonly eventId: UUID;

    constructor(
        public readonly aggregateId: string,
        public readonly eventName: string
    ) {
        this.occurredOn = new Date();
        this.eventId = UUID.create();
    }
    toString(){
        return{
            eventName:this.eventName,
            eventId:this.eventId.value,
        }
    }
}