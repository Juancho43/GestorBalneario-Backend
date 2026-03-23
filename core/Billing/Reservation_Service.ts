import {UUID} from "../common/Model/UUID";
import {Money} from "../Payment/Model/Money";
import {InvoiceItem} from "./InvoiceItem";
import {StringObject} from "../common/Model/StringObject";
import {Payment} from "../Payment/Model/Payment";

export class Reservation_Service implements InvoiceItem{
    private id: UUID;
    private price : Money;
    private description : StringObject;
    private invoiceId: UUID;
    private serviceId: UUID;
    private reservationId: UUID;

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