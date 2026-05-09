import {GetSeasonsInvoicesDAO} from "../../../core/Invoice/Application/Interfaces/GetSeasonsInvoicesDAO";
import {Injectable} from "@nestjs/common";
import {SqliteBaseClass} from "../../database/SqliteBaseClass";
import { Invoice } from "core/Invoice/Model/Invoice";
import { GetSeasonEntityQuery } from "core/Service/Application/Queries/GetSeasonEntityQuery";
import { UUID } from "core/common/Model/UUID";
import {SoftDelete} from "../../../core/common/Model/SoftDelete";
import {Timestamps} from "../../../core/common/Model/Timestamps";
import {InvoiceResponse} from "../../../core/Invoice/Application/DTO/InvoiceResponse";


@Injectable()
export class SqliteGetSeasonsInvoices extends SqliteBaseClass implements GetSeasonsInvoicesDAO {
    async get(query: GetSeasonEntityQuery): Promise<InvoiceResponse[]> {
        const sql = `
            SELECT
                i.id as invoiceId,
                s.id as serviceId,
                i.clientId as clientId,
                i.date as invoiceDate,
                i.state as invoiceState,
                i.amount as invoiceAmount,
                i.created_at as invoiceCreatedAt,
                i.updated_at as invoiceUpdatedAt

            FROM Invoices i
                     INNER JOIN Invoice_Items ii ON ii.invoiceId = i.id
                     INNER JOIN  Services s ON ii.serviceId = s.id
                     INNER JOIN Season_Services ss ON ss.serviceId = s.id
            WHERE ss.seasonId = @id AND i.deleted_at IS NULL
            GROUP BY invoiceId
            LIMIT @size OFFSET @offset
        `
        const stmt = this.getDb().prepare(sql);
        const result = stmt.all({
            id: query.seasonId,
            size: query.pageSize,
            offset: query.page,
        }) as any[];
        const data: InvoiceResponse[] = [];
        if(result){
            result.forEach((row: any) => {
                    const response = new InvoiceResponse();
                    response.id = row.invoiceId;
                    response.state = row.invoiceState;
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