import {ClientResponse} from "./ClientResponse";
import {PaymentResponse} from "../../../Payment/Application/DTO/PaymentResponse";
import {InvoiceResponse} from "../../../Invoice/Application/DTO/InvoiceResponse";

export class ClientDetailsDTO{
    client: ClientResponse;
    payments: PaymentResponse[] = [];
    invoices: InvoiceResponse[] = [];
}