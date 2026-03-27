import {Invoice} from "../../Model/Invoice";
import {ItemResponse} from "./ItemResponse";

export class InvoiceResponse {
    id:string;
    date:string;
    items: any[];
    amount:number;
    clientId:string;

    static create(invoice: Invoice){
        const response = new InvoiceResponse();
        response.id = invoice.id.value;
        response.date = invoice.date.toISOString();
        response.amount = invoice.amount.finalAmount;
        response.clientId = invoice.clientId.value;
        response.items = ItemResponse.createList(invoice.items);
        return response;
    }

    static createList(invoices: Invoice[]){
        return invoices.map(invoice => this.create(invoice));
    }
}