import {Inject, Injectable} from "@nestjs/common";
import {GetShadowDAO} from "../../../core/Shadow/Model/DAO/GetShadowDAO";
import {Shadow} from "../../../core/Shadow/Model/Shadow";
import {DB_PROVIDER} from "../../database/DBPROVIDER";
import {Coords} from "../../../core/common/Model/Coords";
import {StringObject} from "../../../core/common/Model/StringObject";
import {ShadowType} from "../../../core/Shadow/Model/ValueObjects/ShadowType";
import {ShadowState} from "../../../core/Shadow/Model/ValueObjects/ShadowState";
import {Reservation} from "../../../core/Reservation/Model/Reservation";
import {Client} from "../../../core/Client/Model/Client";
import {EmailObject} from "../../../core/common/Model/EmailObject";
import {Booking} from "../../../core/Reservation/Model/Booking";
import {UUID} from "../../../core/common/Model/UUID";
import {Timestamps} from "../../../core/common/Model/Timestamps";
import {SoftDelete} from "../../../core/common/Model/SoftDelete";

@Injectable()
export class SqliteShadowGetById implements GetShadowDAO{

    constructor(@Inject(DB_PROVIDER) private readonly db: any) {}

    async get(id: string): Promise<Shadow | null> {
        const sql = `
            SELECT
                s.id AS shadowId,
                s.identifier,
                s.type,
                s.x,
                s.y,
                s.created_at,
                s.updated_at,
                r.id AS reservationId 
            FROM Shadows s
                     LEFT JOIN Reservations r ON s.id = r.ShadowID
            WHERE s.id = ?
        `;
        const row = this.db.prepare(sql).get(id);
        let result : Shadow | null = null;
        let reservation : Reservation | null = null;
        if(row){
            result = Shadow.create(
                UUID.restore(row.shadowId),
                StringObject.create(row.identifier),
                ShadowType.create(row.type),
                Coords.create(row.x, row.y),
                Timestamps.restore(row.createdAt, row.updatedAt),
                SoftDelete.restore(null)
            )
        }

        return result;
    }

}