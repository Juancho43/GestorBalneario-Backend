import {UUID} from "../common/Model/UUID";
import {Money} from "../Payment/Model/Money";
import {InvoiceItem} from "../Invoice/Model/InvoiceItem";
import {StringObject} from "../common/Model/StringObject";
import {Payment} from "../Payment/Model/Payment";

export class Reservation_Service implements InvoiceItem{
    private id: UUID;
    private price : Money;
    private description : StringObject;
    private invoiceId: UUID;
    private serviceId: UUID;
    private reservationId: UUID;

    private constructor(
        id: UUID,
        price : Money,
        description : StringObject,
        serviceId : UUID,
        reservationId : UUID,
        invoiceId : UUID,
    ) {
        this.id = id;
        this.price = price;
        this.description = description;
        this.reservationId = reservationId;
        this.serviceId = serviceId;
        this.invoiceId = invoiceId;
    }

    getServiceId(): UUID {
        return this.serviceId;
    }

    getAggregateId(): UUID {
        return this.reservationId
    }

    static create(
        id: UUID,
        price : Money,
        description : StringObject,
        serviceId : UUID,
        reservationId : UUID,
        invoiceId: UUID
    ){
        return new Reservation_Service(
            id,
            price,
            description,
            serviceId,
            reservationId,
            invoiceId
        );
    }

    getId(): UUID {
        return this.id;
    }

    getInvoiceId(): UUID {
        return this.invoiceId;
    }

    getPrice(): Money {
        return this.price;
    }

    getDescription(): StringObject {
        return this.description;
    }

}