import {UniqueIdentifier} from "../common/Model/UniqueIdentifier";
import {Money} from "../Payment/Model/Money";
import {InvoiceItem} from "./InvoiceItem";
import {StringObject} from "../common/Model/StringObject";
import {Payment} from "../Payment/Model/Payment";

export class Reservation_Service implements InvoiceItem{
    private id: UniqueIdentifier;
    private price : Money;
    private description : StringObject;
    private invoiceId: UniqueIdentifier;
    private serviceId: UniqueIdentifier;
    private reservationId: UniqueIdentifier;

    getId(): UniqueIdentifier {
        return this.id;
    }

    getInvoiceId(): UniqueIdentifier {
        return this.invoiceId;
    }

    getPrice(): Money {
        return this.price;
    }

    getDescription(): StringObject {
        return this.description;
    }


}