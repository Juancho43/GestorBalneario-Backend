import {SqliteBaseClass} from "../../database/SqliteBaseClass";
import type {ShadowHistoryDAO} from "../../../core/Shadow/Application/ShadowHistoryDAO";
import {ShadowHistoryDTO} from "../../../core/Shadow/Application/DTO/ShadowHistoryDTO";
import {Injectable} from "@nestjs/common";
import {Shadow} from "../../../core/Shadow/Model/Shadow";
import {ShadowResponse} from "../../../core/Shadow/Application/DTO/ShadowResponse";
import {ReservationResponse} from "../../../core/Reservation/Application/DTO/ReservationResponse";
@Injectable()
export class SqliteGetShadowHistory extends SqliteBaseClass implements ShadowHistoryDAO{
    async get(id: string, page: number, limit: number): Promise<ShadowHistoryDTO> {
        const sql = `
            SELECT r.id    AS reservationId,
                   r.checkIn,
                   r.checkOut,
                   r.date  AS reservation_date,
                   c.name  AS client_name,
                   c.email AS client_email,
                    s.id AS shadowId,
                s.x,
                s.y,
                s.identifier
            FROM Reservations r
                     JOIN Clients c ON r.clientId = c.id
                    JOIN Shadows s ON r.shadowId = s.id
            WHERE r.shadowId = @id
            ORDER BY r.date DESC
            LIMIT @limit OFFSET @offset;
        `
        const result = this.getDb().prepare(sql).all({id:id,offset:page, limit:limit})as any;
        const dto = this.toDTO(result);
        dto.page=page;
        return dto;

    }
    private toDTO(rows: any): ShadowHistoryDTO{
        const historyDTO = new ShadowHistoryDTO();
        historyDTO.reservation = [];
        const shadow : ShadowResponse = {
            id: rows[0].shadowId, // Asegúrate que este sea s.id en el SQL
            identifier: rows[0].identifier,
            type: rows[0].type,
            coords: {
                x: rows[0].x,
                y: rows[0].y
            },
            state: rows[0].reservationId ? 'occupied' : 'available'
        };
        rows.forEach(row=>{
            const reservation: ReservationResponse = {
                id: row.reservationId, // El ID de la reserva
                dates: {
                    checkIn: row.checkIn,
                    checkOut: row.checkOut,
                },
                duration: 0,
            }
           historyDTO.reservation.push(reservation)
        })
        historyDTO.shadow = shadow;
        return historyDTO;
    }
}