import {Injectable} from "@nestjs/common";
import {ShadowSearchQuery} from "../../../core/Shadow/Application/Queries/ShadowSearchQuery";
import {ShadowSearchDAO} from "../../../core/Shadow/Model/DAO/ShadowSearcherDAO";
import {SqliteBaseClass} from "../../database/SqliteBaseClass";
import {ShadowResponse} from "core/Shadow/Application/Response/ShadowResponse";

@Injectable()
export class SqliteShadowSearch extends SqliteBaseClass implements ShadowSearchDAO {
    async search(query: ShadowSearchQuery): Promise<ShadowResponse[]> {

        const sql = `
            SELECT s.id, s.state, s.identifier, s.type,COUNT(*) OVER() as Total
            FROM Shadows s
                     INNER JOIN Season_Shadows ss ON ss.shadowId = s.id
            WHERE
                s.deleted_at IS NULL AND ss.seasonId = @seasonId
                ${query.query !== '' ? 'AND s.identifier = @query' : ''}
                ${query.type !== 'All' ? 'AND s.type = @type' : ''}
                ${query.state !== 'All' ? 'AND s.state = @state' : ''}
            ORDER BY s.identifier ${query.direction}
            LIMIT @limit OFFSET @offset
        `
        const offset = query.pageSize * query.page;

        const stmt = this.getDb().prepare(sql);
        const results = stmt.all({
            limit: query.pageSize,
            offset: offset,
            query: query.query,
            seasonId: query.seasonId,
            type: query.type,
            state: query.state,
        }) as any[];
        console.log(results);
        const data : ShadowResponse[] = [];
        results.forEach((row) => {
            const response = new ShadowResponse();
            response.id = row.id;
            response.identifier = row.identifier;
            response.type = row.type;
            response.state = row.state;
            data.push(response);
        })
        return data;
    }
}