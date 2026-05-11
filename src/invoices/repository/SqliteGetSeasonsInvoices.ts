import {GetSeasonsInvoicesDAO} from "../../../core/Invoice/Application/Interfaces/GetSeasonsInvoicesDAO";
import {Injectable} from "@nestjs/common";
import {SqliteBaseClass} from "../../database/SqliteBaseClass";
import {InvoiceResponse} from "../../../core/Invoice/Application/DTO/InvoiceResponse";
import {GetSeasonInvoicesQuery} from "../../../core/Invoice/Application/Queries/GetSeasonInvoicesQuery";


@Injectable()
export class SqliteGetSeasonsInvoices extends SqliteBaseClass implements GetSeasonsInvoicesDAO {
    async get(query: GetSeasonInvoicesQuery): Promise<InvoiceResponse[]> {
        const sql = `
            SELECT
                i.id as invoiceId,
                s.id as serviceId,
                i.clientId as clientId,
                i.date as invoiceDate,
                i.state as invoiceState,
                i.amount as invoiceAmount,
                i.created_at as invoiceCreatedAt,
                i.updated_at as invoiceUpdatedAt,
                c.name as clientName

            FROM Invoices i
                     INNER JOIN Invoice_Items ii ON ii.invoiceId = i.id
                     INNER JOIN  Services s ON ii.serviceId = s.id
                     INNER JOIN Season_Services ss ON ss.serviceId = s.id
                     INNER JOIN Clients c ON i.clientId = c.id
            WHERE ss.seasonId = @id AND i.deleted_at IS NULL AND (@state = 'ALL' OR i.state = @state)
            GROUP BY invoiceId
            LIMIT @size OFFSET @offset
        `
        const stmt = this.getDb().prepare(sql);
        const result = stmt.all({
            id: query.seasonId,
            size: query.pageSize,
            offset: query.page,
            state: query.state
        }) as any[];
        const data: InvoiceResponse[] = [];
        if(result){
            result.forEach((row: any) => {
                    const response = new InvoiceResponse();
                    response.id = row.invoiceId;
                    response.state = row.invoiceState;
                    response.clientName = row.clientName;
                    response.date = row.invoiceDate;
                    response.amount = row.invoiceAmount;
                    response.clientId = row.clientId;
                    response.create_at = row.invoiceCreatedAt;
                    response.updated_at = row.invoiceUpdatedAt
                    data.push(response);
                }
            )
        }
        return data;
    }
}