import {Inject, Injectable} from "@nestjs/common";
import {GetCurrentShadows} from "../../../core/Shadow/Model/GetCurrentShadows";
import { Shadow } from "core/Shadow/Model/Shadow";
import {DB_PROVIDER} from "../../database/DBPROVIDER";
import {StringObject} from "../../../core/common/Model/StringObject";
import {ShadowType} from "../../../core/Shadow/Model/ValueObjects/ShadowType";
import {ShadowState} from "../../../core/Shadow/Model/ValueObjects/ShadowState";
import {Coords} from "../../../core/common/Model/Coords";

@Injectable()
export class SqliteShadowsGetCurrent implements GetCurrentShadows {

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
                row.id,
                StringObject.create(row.identifier),
                ShadowType.create(row.type),
                ShadowState.create(row.state),
                Coords.create(row.x, row.y)
            )
        );
    }

}