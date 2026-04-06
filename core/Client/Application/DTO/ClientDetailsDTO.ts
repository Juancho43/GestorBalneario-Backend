import {ClientResponse} from "./ClientResponse";
import {InvoiceResponse} from "../../../Invoice/Application/DTO/InvoiceResponse";

export class ClientDetailsDTO{
    client: ClientResponse;
    invoices: InvoiceResponse[] = [];
}