import {Injectable} from "@nestjs/common";
import {SqliteBaseClass} from "../../database/SqliteBaseClass";
import {ClientDetailsDAO} from "../../../core/Client/Application/Interfaces/ClientDetailsDAO";
import { ClientDetailsDTO } from "core/Client/Application/DTO/ClientDetailsDTO";
import {ClientResponse} from "../../../core/Client/Application/DTO/ClientResponse";
import {InvoiceResponse} from "../../../core/Invoice/Application/DTO/InvoiceResponse";
import {ClientDetailQuery} from "../../../core/Client/Application/Queries/ClientDetailQuery";

@Injectable()
export class SqliteClientDetails extends SqliteBaseClass implements ClientDetailsDAO {
    async get(query: ClientDetailQuery): Promise<ClientDetailsDTO> {
        const stmt = this.getDb().prepare(`
            SELECT
                c.id as clientId,
                c.name as clientName,
                c.email as clientEmail,
                c.phone as clientPhone,
                i.id as invoiceId,
                i.amount as invoiceAmount,
                i.date as invoiceDate
            FROM Clients AS c
                     LEFT JOIN Invoices AS i ON i.clientId = c.id
            WHERE c.id = @clientId
            ORDER BY i.date DESC
            LIMIT @limit OFFSET @offset
        `);
        const results = stmt.all({
            clientId: query.clientId,
            limit:query.limit,
            offset: query.offset
        }) as any[];
        const dto = new ClientDetailsDTO();
        if(results.length > 0){
            const clientRow = results[0];
            dto.client = new ClientResponse();
            dto.client.id = clientRow.clientId;
            dto.client.name = clientRow.clientName;
            dto.client.phone = clientRow.clientPhone;
            dto.client.email = clientRow.clientEmail;

            const invoices = new Map<string,InvoiceResponse>();
            results.forEach(row => {
                if(!invoices.has(row.invoiceId)){
                    const response = new InvoiceResponse()
                    response.id = row.invoiceId;
                    response.clientId = row.clientId;
                    response.date = row.invoiceDate;
                    response.amount = row.invoiceAmount;
                    invoices.set(row.invoiceId,response)
                }
            })

            dto.invoices = Array.from(invoices.values());
        }
        return dto;
    }
}