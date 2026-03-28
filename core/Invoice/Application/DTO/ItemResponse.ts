import {InvoiceItem} from "../../Model/InvoiceItem";

export class ItemResponse {

    id: string;
    price: number;
    description: string;
    aggregatedId: string;
    serviceId: string;
    static create(item: InvoiceItem){
        const response = new ItemResponse();
        response.id = item.getId().value;
        response.aggregatedId = item.getAggregateId().value;
        response.price = item.getPrice().finalAmount
        response.serviceId = item.getServiceId().value;
        return response;
    }
    static createList(items: InvoiceItem[]){
        return items.map(item => {return this.create(item)});
    }
}