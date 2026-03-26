import {Inject, Injectable} from "@nestjs/common";
import {GetShadowDAO} from "../../../core/Shadow/Model/DAO/GetShadowDAO";
import {Shadow} from "../../../core/Shadow/Model/Shadow";
import {Coords} from "../../../core/common/Model/Coords";
import {StringObject} from "../../../core/common/Model/StringObject";
import {ShadowType} from "../../../core/Shadow/Model/ValueObjects/ShadowType";
import {Reservation} from "../../../core/Reservation/Model/Reservation";
import {Booking} from "../../../core/Reservation/Model/Booking";
import {UUID} from "../../../core/common/Model/UUID";
import {Timestamps} from "../../../core/common/Model/Timestamps";
import {SoftDelete} from "../../../core/common/Model/SoftDelete";
import {SqliteBaseClass} from "../../database/SqliteBaseClass";

@Injectable()
export class SqliteShadowGetById extends SqliteBaseClass implements GetShadowDAO{


    async get(id: string): Promise<Shadow | null> {
        const sql = `
            SELECT
                s.id AS shadowId, s.identifier, s.type, s.x, s.y,
                s.created_at, s.updated_at,
                r.id AS reservationId, r.checkIn, r.checkOut, r.clientId, r.date,
                r.created_at AS resCreated, r.updated_at as resUpdated
            FROM Shadows s
                     LEFT JOIN Reservations r ON s.id = r.ShadowID
            WHERE s.id = ? -- Usamos el signo de interrogación
        `;

        const row = this.getDb().prepare(sql).all(id) as any[];
        let result : Shadow | null = null;
        if(row){
            const firstRow = row[0];

            result = Shadow.create(
                UUID.restore(firstRow.shadowId),
                StringObject.create(firstRow.identifier),
                ShadowType.create(firstRow.type),
                Coords.create(firstRow.x, firstRow.y),
                Timestamps.restore(firstRow.created_at, firstRow.updated_at), // Ojo aquí con las mayúsculas
                SoftDelete.restore(null)
            );
            if(row[0].reservationId){
                const reservations: Reservation[] = row.map(row => {

                    return Reservation.create(
                        UUID.restore(row.reservationId),
                        UUID.restore(row.clientId),
                        UUID.restore(row.shadowId),
                        Booking.create(new Date(row.checkIn), new Date(row.checkOut)),
                        Timestamps.restore(row.resCreated, row.resUpdated),
                        SoftDelete.restore(null)
                    );

                });
                reservations.forEach(reservation => {
                    if(result){

                        result.addReservation(reservation);
                    }
                })
            }
        }

        return result;
    }

}