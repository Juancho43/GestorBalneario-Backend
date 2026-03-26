import {BaseDomainEvent} from "./BaseDomainEvent";

export interface EventPublisher{
    publish(event: BaseDomainEvent): void;
}