import {Injectable} from "@nestjs/common";
import {ServiceSearcherDAO} from "../../../core/Service/Model/ServiceSearchDAO";
import {SqliteBaseClass} from "../../database/SqliteBaseClass";
import {ServiceResponse} from "core/Service/Application/DTO/ServiceResponse";
import {ServiceSearchQuery} from "core/Service/Application/Queries/ServiceSearchQuery";

@Injectable()
export class ServiceSearcher extends SqliteBaseClass implements ServiceSearcherDAO {
    async search(query: ServiceSearchQuery): Promise<ServiceResponse[]> {
        console.log(query)
        const offset = query.page * query.pageSize;
        const sql = `
        SELECT s.id,s.description,s.price
        FROM Services s
        INNER JOIN Season_Services ss ON ss.serviceId = s.id
            WHERE 
            s.description LIKE  '%' || @query || '%'
            AND ss.seasonId = @seasonId 
            AND s.deleted_at IS NULL
            ORDER BY ${query.orderBy} ${query.direction}
        LIMIT @limit OFFSET @offset
        `
        const stmt = this.getDb().prepare(sql);
        const results = stmt.all({
            query: query.query,
            limit: query.pageSize,
            offset: offset,
            seasonId: query.seasonId
        }) as any[];
        const data : ServiceResponse[]=[];
        results.forEach((row) => {
            const response = new ServiceResponse();
            response.id = row.id;
            response.name = row.description;
            response.price = row.price;
            data.push(response);
        });
        return data;
    }

}