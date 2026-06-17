import {Injectable} from "@nestjs/common";
import {GetSeasonDetailsDAO} from "../../../core/Season/Application/Interfaces/GetSeasonDetailsDAO";
import {SqliteBaseClass} from "../../database/SqliteBaseClass";
import { GetByIdQuery } from "core/common/Application/GetByIdQuery";
import { SeasonDetailsResponse } from "core/Season/Application/DTO/SeasonDetailsResponse";
import {SeasonResponse} from "../../../core/Season/Application/DTO/SeasonResponse";

@Injectable()
export class SqliteGetSeasonDetails extends SqliteBaseClass implements GetSeasonDetailsDAO {
    async get(id: GetByIdQuery): Promise<SeasonDetailsResponse> {
        const sql = `
            SELECT
                s.*,
                (SELECT COUNT(*)
                 FROM Season_Shadows ss
                          JOIN Shadows sh ON ss.shadowId = sh.id
                 WHERE ss.seasonId = s.id
                   AND sh.deleted_at IS NULL
                   AND sh.deleted_at IS NULL) AS total_shadows,
                (SELECT COUNT(*)
                 FROM Season_Services srv_j
                          JOIN Services srv ON srv_j.serviceId = srv.id
                 WHERE srv_j.seasonId = s.id
                   AND srv.deleted_at IS NULL
                   AND srv.deleted_at IS NULL) AS total_services
            FROM Seasons s
            WHERE s.id = @id
              AND s.deleted_at IS NULL;
        `
        const stmt = this.getDb().prepare(sql);
        const result = stmt.get({id:id.id}) as any;
        const data = new SeasonDetailsResponse();
        const season = new SeasonResponse();
        season.id = result.id;
        season.name = result.name;
        season.startDate = result.startDate;
        season.endDate = result.endDate;
        season.isActive = result.is_active === 1;
        data.season = season;
        data.shadows = result.total_shadows;
        data.services = result.total_services;
        return data;
    }
}