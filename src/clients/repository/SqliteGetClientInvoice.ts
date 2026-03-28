import {SqliteBaseClass} from "../../database/SqliteBaseClass";
import {GetClientsInvoicesDAO} from "../../../core/Client/Model/DAO/GetClientsInvoicesDAO";
import {Injectable} from "@nestjs/common";
import { Client } from "core/Client/Model/Client";
import {UUID} from "../../../core/common/Model/UUID";
import {StringObject} from "../../../core/common/Model/StringObject";
import {EmailObject} from "../../../core/common/Model/EmailObject";
import {Timestamps} from "../../../core/common/Model/Timestamps";
import {SoftDelete} from "../../../core/common/Model/SoftDelete";
import {Invoice} from "../../../core/Invoice/Model/Invoice";

@Injectable()
export class SqliteGetClientInvoice extends SqliteBaseClass implements GetClientsInvoicesDAO {
    async get(clientId: string): Promise<Client | null> {
        const sql = `
            SELECT
                c.name,
                c.phone,
                c.email,
                c.created_at as clientCreated,
                c.updated_at as clientUpdated,
                i.created_at as invoiceCreated,
                i.updated_at as invoiceUpdated,
                i.id as invoiceId,
                i.date 
            FROM Clients c
                     left join Invoices i ON i.clientId = c.id
            WHERE c.deleted_at IS NULL and c.id = @id
            ORDER BY i.date DESC
        `
        const results = this.getDb().prepare(sql).all({id:clientId}) as any;
        const clientResult = results[0];
        let response :Client|null = null
        if(results){
            const client = Client.create(
                UUID.restore(clientId),
                StringObject.create(clientResult.name),
                EmailObject.create(clientResult.email),
                StringObject.create(clientResult.phone),
                Timestamps.restore(clientResult.clientCreated,clientResult.clientUpdated),
                SoftDelete.empty()
            )
            if(results[0].invoiceId){
                results.forEach(result => {
                    const invoice = Invoice.create(
                        UUID.restore(result.invoiceId),
                        new Date(result.date),
                        UUID.restore(clientId),
                        Timestamps.restore(result.invoiceCreated, result.invoiceUpdated),
                        SoftDelete.empty()
                    );
                    client.addInvoice(invoice);
                })
            }
            response = client;
        }
        return response;
    }
}