import {InvoiceDetailQuery} from "./DTO/InvoiceDetailQuery";
import {InvoiceDetailsDTO} from "./DTO/InvoiceDetailsDTO";

export interface InvoiceDetailDAO{
    get(query: InvoiceDetailQuery): Promise<InvoiceDetailsDTO>;
}