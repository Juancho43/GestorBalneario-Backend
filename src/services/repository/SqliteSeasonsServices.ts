import {Injectable} from "@nestjs/common";
import {SeasonServiceDAO} from "../../../core/Service/Application/Interfaces/SeasonServiceDAO";
import {SqliteBaseClass} from "../../database/SqliteBaseClass";
import { SeasonServiceDTO } from "core/Service/Application/DTO/SeasonServiceDTO";
import { GetSeasonServicesQuery } from "core/Service/Application/Queries/GetSeasonServicesQuery";
import {ServiceResponse} from "../../../core/Service/Application/DTO/ServiceResponse";

@Injectable()
export class SqliteSeasonsServices extends SqliteBaseClass implements SeasonServiceDAO {
   async get(query: GetSeasonServicesQuery): Promise<SeasonServiceDTO> {
        const sql = `
        SELECT * FROM Services s 
            INNER JOIN Season_Services ss ON ss.serviceId = s.id
            WHERE ss.seasonId = @seasonId
            LIMIT @limit OFFSET @offset
        `
        const results = this.getDb().prepare(sql).all({
            seasonId: query.seasonId,
            limit: query.limit,
            offset: query.page,
        }) as any[];

        const response = new SeasonServiceDTO();
        results.forEach((result) => {
            const service = new ServiceResponse();
            service.id = result.id;
            service.name = result.description;
            service.price = result.price;
            response.services.push(service);
        })
        return response;
    }
}