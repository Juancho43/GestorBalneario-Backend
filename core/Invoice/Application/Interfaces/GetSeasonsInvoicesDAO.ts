import {InvoiceResponse} from "../DTO/InvoiceResponse";
import {GetSeasonInvoicesQuery} from "../Queries/GetSeasonInvoicesQuery";

export interface GetSeasonsInvoicesDAO {
    get(query: GetSeasonInvoicesQuery): Promise<InvoiceResponse[]>;
}