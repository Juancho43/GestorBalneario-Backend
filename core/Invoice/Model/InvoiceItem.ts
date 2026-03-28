import {UUID} from "../../common/Model/UUID";
import {Money} from "../../Payment/Model/Money";
import {StringObject} from "../../common/Model/StringObject";

export interface InvoiceItem{
    getInvoiceId():UUID;
    getPrice():Money;
    getId():UUID;
    getDescription():StringObject;
    getAggregateId():UUID;
    getServiceId():UUID;
}