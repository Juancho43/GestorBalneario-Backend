import {Injectable} from "@nestjs/common";
import {SqliteBaseClass} from "../../database/SqliteBaseClass";
import {Season} from "../../../core/Season/Model/Season";
import {GetSeasonDAO} from "../../../core/Season/Model/DAO/GetSeasonDAO";
import {UUID} from "../../../core/common/Model/UUID";
import {Timestamps} from "../../../core/common/Model/Timestamps";
import {SoftDelete} from "../../../core/common/Model/SoftDelete";

@Injectable()
export class SqliteGetSeason extends SqliteBaseClass implements GetSeasonDAO {
    async get(id:string): Promise<Season | null> {
        const sql = `SELECT * FROM Seasons WHERE id = @id AND deleted_at IS NULL `;
        const stmt = this.getDb().prepare(sql);
        const result = stmt.get({id: id}) as any;
        let season :Season | null = null;
        if (result) {
            season = Season.create(
                UUID.restore(result.id),
                new Date(result.startDate),
                new Date(result.endDate),
                Timestamps.restore(new Date(result.created_at), new Date(result.updated_at)),
                SoftDelete.empty()
            )
        }
        return season;
    }
}
