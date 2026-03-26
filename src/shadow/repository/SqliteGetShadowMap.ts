import {Injectable} from "@nestjs/common";
import {SqliteBaseClass} from "../../database/SqliteBaseClass";
import {ShadowMapDAO} from "../../../core/Shadow/Application/ShadowMapDAO";
import { ShadowMapDTO } from "core/Shadow/Application/DTO/ShadowMapDTO";
import {ShadowResponse} from "../../../core/Shadow/Application/DTO/ShadowResponse";
import {ReservationResponse} from "../../../core/Reservation/Application/DTO/ReservationResponse";
import {ClientResponse} from "../../../core/Client/Application/DTO/ClientResponse";

@Injectable()
export class SqliteGetShadowMap extends SqliteBaseClass implements ShadowMapDAO {
    async get(): Promise<ShadowMapDTO> {
        const sql = `
            SELECT
                s.id AS id,              
                s.identifier,
                s.type,
                s.x,
                s.y,
                r.id AS reservationId,  
                r.checkIn,
                r.checkOut,
                c.id AS clientId,        
                c.name,
                c.phone,
                c.email
            FROM Shadows s
                     LEFT JOIN Reservations r ON r.shadowId = s.id and (CURRENT_TIMESTAMP BETWEEN r.checkIn and r.checkOut) 
                     LEFT JOIN Clients c ON r.clientId = c.id
        `;
        const results = this.getDb().prepare(sql).all() as any;
        return this.toDTO(results)    ;
    }
    private toDTO(rows: any[]): ShadowMapDTO {
        const mapResponse = new ShadowMapDTO();
        mapResponse.map = []; // Inicializamos el array de resultados

        rows.forEach(row => {
            // 1. Construimos el objeto de la Sombra (siempre existe)
            const shadow: ShadowResponse = {
                id: row.id, // Asegúrate que este sea s.id en el SQL
                identifier: row.identifier,
                type: row.type,
                coords: {
                    x: row.x,
                    y: row.y
                },
                state: row.reservationId ? 'occupied' : 'available'
            };

            // 2. Construimos la Reserva (solo si existe shadowId en la fila)
            const reservation: ReservationResponse | undefined = row.reservationId ? {
                id: row.reservationId, // El ID de la reserva
                dates: {
                    checkIn: row.checkIn,
                    checkOut: row.checkOut,
                },
                duration: 0,
            } : undefined;

            // 3. Construimos el Cliente (solo si existe clientId en la fila)
            const client: ClientResponse | undefined = row.clientId ? {
                id: row.clientId,
                name: row.name,
                phone: row.phone,
                email: row.email
            } : undefined;

            // 4. Agregamos al mapa general
            mapResponse.map.push({
                shadow,
                reservation,
                client
            });
        });

        return mapResponse;
    }
}