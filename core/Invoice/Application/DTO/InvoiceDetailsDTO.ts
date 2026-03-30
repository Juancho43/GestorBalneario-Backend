import {ItemResponse} from "./ItemResponse";
import {ClientResponse} from "../../../Client/Application/DTO/ClientResponse";
import {PaymentResponse} from "../../../Payment/Application/DTO/PaymentResponse";
import {InvoiceResponse} from "./InvoiceResponse";

export class InvoiceDetailsDTO{
    invoice: InvoiceResponse;
    items: ItemResponse[] = [];
    client: ClientResponse;
    payments: PaymentResponse[] = [];

}