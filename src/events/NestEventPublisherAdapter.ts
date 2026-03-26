import { Injectable } from '@nestjs/common';
import {EventPublisher} from "../../core/common/Application/EventPublisher";
import {EventBus} from "@nestjs/cqrs";

@Injectable()
export class NestEventPublisherAdapter implements EventPublisher {
    constructor(private readonly eventBus: EventBus) {}

    publish(event: any): void {
        this.eventBus.publish(event);
    }
}