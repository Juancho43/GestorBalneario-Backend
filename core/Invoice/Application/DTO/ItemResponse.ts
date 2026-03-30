import {InvoiceItem} from "../../Model/InvoiceItem";
import {ReservationResponse} from "../../../Reservation/Application/DTO/ReservationResponse";

export class ItemResponse {
    id: string;
    price: number;
    description: string;
    aggregatedId: string;
    serviceId: string;
    aggregate: string;
    aggregateObject?: ReservationResponse | any;
    static create(item: InvoiceItem){
        const response = new ItemResponse();
        response.id = item.getId().value;
        response.aggregatedId = item.getAggregateId().value;
        response.aggregate = item.getAggregate();
        response.price = item.getPrice().finalAmount
        response.serviceId = item.getServiceId().value;
        return response;
    }
    static createList(items: InvoiceItem[]){
        return items.map(item => {return this.create(item)});
    }
}