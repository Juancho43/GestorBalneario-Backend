import {Injectable} from "@nestjs/common";
import {SqliteBaseClass} from "../../database/SqliteBaseClass";
import {CreateSeasonDAO} from "../../../core/Season/Model/DAO/CreateSeasonDAO";
import { Season } from "core/Season/Model/Season";
import {Client} from "../../../core/Client/Model/Client";

@Injectable()
export class SqliteCreateSeason extends SqliteBaseClass implements CreateSeasonDAO {
   async create(season: Season): Promise<void> {
    const sql=`
        INSERT INTO Seasons (id,startDate,endDate,created_at,updated_at)
            VALUES (:id, :startDate, :endDate, :createdAt, :updatedAt)
    `;
    const stmt = this.getDb().prepare(sql);
       stmt.run({
           id: season.id.value,
           startDate: season.startDate.toISOString(),
           endDate: season.endDate.toISOString(),
           createdAt: season.timestamps.createdAt.toISOString(),
           updatedAt: season.timestamps.updatedAt.toISOString(),
       });
   }
}
