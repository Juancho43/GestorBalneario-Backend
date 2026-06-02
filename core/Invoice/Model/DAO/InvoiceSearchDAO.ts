import {InvoiceSearchQuery} from "../../Application/Queries/InvoiceSearchQuery";
import {InvoiceResponse} from "../../Application/DTO/InvoiceResponse";

export interface InvoiceSearchDAO {
    search(query: InvoiceSearchQuery): Promise<InvoiceResponse[]>;
}