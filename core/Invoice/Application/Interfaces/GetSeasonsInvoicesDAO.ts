import {GetSeasonEntityQuery} from "../../../Service/Application/Queries/GetSeasonEntityQuery";
import {InvoiceResponse} from "../DTO/InvoiceResponse";

export interface GetSeasonsInvoicesDAO {
    get(query: GetSeasonEntityQuery): Promise<InvoiceResponse[]>;
}