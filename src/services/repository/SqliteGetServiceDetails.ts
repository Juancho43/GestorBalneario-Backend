import {Injectable} from "@nestjs/common";
import {SqliteBaseClass} from "../../database/SqliteBaseClass";
import {GetServiceDetailsDAO} from "../../../core/Service/Application/Interfaces/GetServicesDetailsDAO";
import { GetByIdQuery } from "core/common/Application/GetByIdQuery";
import { ServiceDetailsResponse } from "core/Service/Application/DTO/ServiceDetailsResponse";
import {ServiceResponse} from "../../../core/Service/Application/DTO/ServiceResponse";

@Injectable()
export class SqliteGetServiceDetails extends SqliteBaseClass implements GetServiceDetailsDAO {
    async get(id: GetByIdQuery): Promise<ServiceDetailsResponse> {
        const sql = `
            SELECT
                s.id AS id,
                s.type as type,
                s.price as price,
                s.description as name,
                s.updated_at,
                s.created_at,
                (SELECT COUNT(*)
                 FROM Invoice_Items ii
                 WHERE ii.serviceId = @id
                   AND ii.deleted_at IS NULL) AS total_invoice_appearances
            FROM Services s
            WHERE s.id = @id
              AND s.deleted_at IS NULL;
        `;
        const stmt = this.getDb().prepare(sql);
        const results = stmt.get({id: id.id}) as any;
        const data = new ServiceDetailsResponse();
        const service = new ServiceResponse();
        service.id = results.id;
        service.name = results.name;
        service.price = results.price;
        service.create_at = results.created_at;
        service.updated_at = results.updated_at;
        service.type = results.type;
        data.service = service;
        data.invoices = results.total_invoice_appearances;
        return data;
    }
}