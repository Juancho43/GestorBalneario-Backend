import {Inject, Injectable} from "@nestjs/common";
import {GetShadow} from "../../../core/Shadow/Model/GetShadow";
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

@Injectable()
export class SqliteShadowGetById implements GetShadow{

    constructor(@Inject(DB_PROVIDER) private readonly db: any) {}

    async get(id: string): Promise<Shadow | null> {
        const sql = `
            SELECT * FROM Shadows
                LEFT JOIN Reservations r ON Shadows.id = r.ShadowID
                              LEFT JOIN Clients c ON r.ClientID = c.id
            WHERE (Shadows.id = @id) OR (
                (Shadows.id = @id) AND ( CURRENT_TIMESTAMP  BETWEEN r.checkIn AND r.checkOut))
        `;
        const row = this.db.prepare(sql).get({ id: id});
        let result : Shadow | null = null;
        let reservation : Reservation | null = null;
        let client : Client | null = null;
        if(row.clientId){
            result = Shadow.create(
                row.id,
                StringObject.create(row.identifier),
                ShadowType.create(row.type),
                ShadowState.create(row.state),
                Coords.create(row.x, row.y)
            );
            client = Client.create(
                row.clientId,
                StringObject.create(row.name),
                EmailObject.create(row.email),
                StringObject.create(row.phone)
            )
            reservation = Reservation.create(
                row.id,
                client,
                result,
                Booking.create(new Date(row.checkIn), new Date(row.checkOut))
            )
            result.currentReservation = reservation
        }else if (row) {
            result = Shadow.create(
                id,
                StringObject.create(row.identifier),
                ShadowType.create(row.type),
                ShadowState.create(row.state),
                Coords.create(row.x, row.y)
            );
        }
        return result;
    }

}