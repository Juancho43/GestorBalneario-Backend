import {Injectable} from "@nestjs/common";
import {SeasonSearchDAO} from "../../../core/Season/Model/DAO/SeasonSearchDAO";
import {SqliteBaseClass} from "../../database/SqliteBaseClass";
import {SeasonResponse} from "core/Season/Application/DTO/SeasonResponse";
import {SeasonSearchQuery} from "core/Season/Application/Queries/SeasonSearchQuery";

@Injectable()
export class SqliteSeasonSearch extends SqliteBaseClass implements SeasonSearchDAO {
    async search(query: SeasonSearchQuery): Promise<SeasonResponse[]> {
        const offset = query.page * query.pageSize;
        const sql = `
            SELECT
                id,
                name,
                startDate,
                endDate
            FROM Seasons
            WHERE
                (name LIKE  '%' || @query || '%')
              AND deleted_at IS NULL
            ORDER BY ${query.orderBy} ${query.direction!.toUpperCase()}
            LIMIT @limit OFFSET @page
        `;
        const stmt = this.getDb().prepare(sql);
        const results = stmt.all({
            limit: query.pageSize,
            page: offset,
            query:query.query
        }) as any[];
        const data : SeasonResponse[] = [];
        results.forEach((row) => {
            const response = new SeasonResponse();
            response.id = row.id;
            response.name = row.name;
            response.startDate = row.startDate;
            response.endDate = row.endDate;
            data.push(response);
        })
        return data;
    }

}