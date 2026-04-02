import {SqliteBaseClass} from "../../database/SqliteBaseClass";
import {Injectable} from "@nestjs/common";
import {GetActiveSeasonDAO} from "../../../core/Season/Application/Interfaces/GetActiveSeasonDAO";
import {SeasonResponse} from "../../../core/Season/Application/DTO/SeasonResponse";

@Injectable()
export class SqliteGetActiveSeason extends SqliteBaseClass implements GetActiveSeasonDAO {
    async get(): Promise<SeasonResponse> {
        const sql = `
            SELECT * FROM Seasons s
            WHERE isActive = 1 AND deleted_at IS NULL
        `
        const result = this.getDb().prepare(sql).get() as any;
        const response = new SeasonResponse();
        response.id = result.id;
        response.name = result.name;
        response.startDate = result.startDate;
        response.endDate = result.endDate;
        response.isActive = true;
        return response;
    }
}