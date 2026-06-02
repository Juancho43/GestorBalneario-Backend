import {Injectable} from "@nestjs/common";
import {SqliteBaseClass} from "../../database/SqliteBaseClass";
import {InvoiceSearchDAO} from "../../../core/Invoice/Model/DAO/InvoiceSearchDAO";
import {InvoiceResponse} from "core/Invoice/Application/DTO/InvoiceResponse";
import {InvoiceSearchQuery} from "core/Invoice/Application/Queries/InvoiceSearchQuery";

@Injectable()
export class SqliteSearchInvoice extends SqliteBaseClass implements InvoiceSearchDAO {
    async search(query: InvoiceSearchQuery): Promise<InvoiceResponse[]> {
        const offset = query.pageSize * query.page;
        const sql = `
        SELECT DISTINCT i.id, i.state, i.date, i.amount, c.name 
        FROM Invoices i
            INNER JOIN Clients c ON i.clientId = c.id
            INNER JOIN invoice_Items ii ON  ii.invoiceId = i.id
            INNER JOIN Services s ON ii.serviceId = s.id
            INNER JOIN Season_Services ss ON ss.serviceId = s.id
            WHERE i.deleted_at IS NULL AND ss.seasonId = @seasonId
            ${query.query !== '' ? 'AND c.name LIKE @query' : ''}
            ${query.state === 'All' ? '' : 'AND i.state = @state'}
            ORDER BY ${query.orderBy} ${query.direction}
            LIMIT @limit OFFSET @offset
        `;
        const stmt = this.getDb().prepare(sql);
        const results = stmt.all({
            limit: query.pageSize,
            offset: offset,
            state: query.state,
            seasonId: query.seasonId,
            query: `%${query.query}%`
        }) as any[];
        const data : InvoiceResponse[] = []
        results.forEach((row) => {
            const response = new InvoiceResponse();
            response.id = row.id;
            response.state = row.state;
            response.date = row.date;
            response.amount = row.amount;
            response.clientName = row.name;
            data.push(response);
        })
        return data;
    }
}