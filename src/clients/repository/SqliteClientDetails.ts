import {Injectable} from "@nestjs/common";
import {SqliteBaseClass} from "../../database/SqliteBaseClass";
import {ClientDetailsDAO} from "../../../core/Client/Application/Interfaces/ClientDetailsDAO";
import { ClientDetailsDTO } from "core/Client/Application/DTO/ClientDetailsDTO";
import { GetClientQuery } from "core/Client/Application/Queries/GetClientQuery";
import {ClientResponse} from "../../../core/Client/Application/DTO/ClientResponse";
import {InvoiceResponse} from "../../../core/Invoice/Application/DTO/InvoiceResponse";
import {PaymentResponse} from "../../../core/Payment/Application/DTO/PaymentResponse";

@Injectable()
export class SqliteClientDetails extends SqliteBaseClass implements ClientDetailsDAO {
    async get(query: GetClientQuery): Promise<ClientDetailsDTO> {
        const stmt = this.getDb().prepare(`
            SELECT
                c.id as clientId,
                c.name as clientName,
                c.email as clientEmail,
                c.phone as clientPhone,
                i.id as invoiceId,
                i.amount as invoiceAmount,
                i.date as invoiceDate,
                p.id as paymentId,
                p.type as paymentType,
                p.amount as paymentAmount,
                p.changeType as paymentChangeType,
                p.date as paymentDate,
                p.finalAmount as paymentFinalAmount,
                p.description as paymentDescription
            FROM Clients AS c
                     LEFT JOIN Invoices AS i ON i.clientId = c.id
                     LEFT JOIN Invoice_Payments AS ip ON ip.invoiceId = i.id
                     LEFT JOIN Payments AS p ON ip.paymentId = p.id
            WHERE c.id = @clientId
        `);
        const results = stmt.all({clientId: query.id}) as any[];
        const dto = new ClientDetailsDTO();
        if(results.length > 0){
            const clientRow = results[0];
            dto.client = new ClientResponse();
            dto.client.id = clientRow.clientId;
            dto.client.name = clientRow.clientName;
            dto.client.phone = clientRow.clientPhone;
            dto.client.email = clientRow.clientEmail;

            const invoices = new Map<string,InvoiceResponse>();
            const payments = new Map<string,PaymentResponse>();
            results.forEach(row => {
                if(!invoices.has(row.invoiceId)){
                    const response = new InvoiceResponse()
                    response.id = row.invoiceId;
                    response.clientId = row.clientId;
                    response.date = row.invoiceDate;
                    response.amount = row.invoiceAmount;
                    invoices.set(row.invoiceId,response)
                }
                if(!payments.has(row.paymentId)){
                    const paymentResponse = new PaymentResponse();
                    paymentResponse.id = row.paymentId;
                    paymentResponse.invoiceId = row.invoiceId;
                    paymentResponse.date = row.payementDate;
                    paymentResponse.description = row.paymentDescription;
                    paymentResponse.type = row.paymentType;
                    paymentResponse.amount = row.paymenAmount;
                    paymentResponse.finalAmount = row.paymentFinalAmount;
                    paymentResponse.changeType = row.paymentChangeType;
                }
            })

            dto.invoices = Array.from(invoices.values());

            dto.payments = Array.from(payments.values());
        }
        return dto;
    }

}