import {Inject, Injectable} from "@nestjs/common";
import {GetShadowListDAO} from "../../../core/Shadow/Model/DAO/GetShadowListDAO";
import { Shadow } from "core/Shadow/Model/Shadow";
import {DB_PROVIDER} from "../../database/DBPROVIDER";
import {StringObject} from "../../../core/common/Model/StringObject";
import {ShadowType} from "../../../core/Shadow/Model/ValueObjects/ShadowType";
import {Coords} from "../../../core/common/Model/Coords";
import {Timestamps} from "../../../core/common/Model/Timestamps";
import {SoftDelete} from "../../../core/common/Model/SoftDelete";
import {UniqueIdentifier} from "../../../core/common/Model/UniqueIdentifier";

@Injectable()
export class SqliteShadowsGetCurrent implements GetShadowListDAO {

    constructor(@Inject(DB_PROVIDER) private readonly db: any) {}
    async getCurrentShadows(): Promise<Shadow[]> {
        const now = new Date().toISOString();
        const sql =
            `SELECT
                 s.*,
                 CASE
                     WHEN r.id IS NOT NULL THEN 'unavailable'
                     ELSE 'available'
                     END AS state
             FROM Shadows s
                      LEFT JOIN Reservations r ON s.id = r.shadowId
                 AND ( ? BETWEEN r.checkIn AND r.checkOut)`;
        const rows = this.db.prepare(sql).all(now);

        return rows.map(row =>
            Shadow.create(
                UniqueIdentifier.restore(row.id),
                StringObject.create(row.identifier),
                ShadowType.create(row.type),
                Coords.create(row.x, row.y),
                Timestamps.restore(row.create_at,row.update_at),
                SoftDelete.restore(row.delete_at),
            )
        );
    }

}