import { StringObject } from "core/common/Model/StringObject";
import { UUID } from "core/common/Model/UUID";
import { Money } from "core/Payment/Model/Money";
import {InvoiceItem} from "../../Invoice/Model/InvoiceItem";

export class Recharge implements InvoiceItem {

    private constructor(
        private id: UUID,
        private price: Money,
        private description: StringObject,
        private serviceId: UUID,
        private aggregateId: UUID,
        private invoiceId: UUID,
    ) {

    }

    public static create(
        id: UUID,
        price: Money,
        description: StringObject,
        serviceId: UUID,
        aggregateId: UUID,
        invoiceId: UUID,
    ): Recharge {
        return new Recharge(id, price, description, serviceId, aggregateId, invoiceId);
    }

    getInvoiceId(): UUID {
        return this.invoiceId;
    }
    getPrice(): Money {
        return this.price;
    }
    getId(): UUID {
        return this.id;
    }
    getDescription(): StringObject {
        return this.description;
    }
    getAggregateId(): UUID {
        return this.aggregateId;
    }
    getServiceId(): UUID {
        return this.serviceId;
    }
    getAggregate(): string {
        return "Recharge";
    }

}