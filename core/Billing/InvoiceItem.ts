import {UniqueIdentifier} from "../common/Model/UniqueIdentifier";
import {Money} from "../Payment/Model/Money";
import {StringObject} from "../common/Model/StringObject";

export interface InvoiceItem{
    getInvoiceId():UniqueIdentifier;
    getPrice():Money;
    getId():UniqueIdentifier;
    getDescription():StringObject;
}