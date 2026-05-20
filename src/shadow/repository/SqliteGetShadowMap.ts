import {Injectable} from '@nestjs/common';
import {SqliteBaseClass} from '../../database/SqliteBaseClass';
import {ShadowMapDAO} from '../../../core/Shadow/Application/Interfaces/ShadowMapDAO';
import {ShadowMapDTO} from 'core/Shadow/Application/Response/ShadowMapDTO';
import {ShadowResponse} from '../../../core/Shadow/Application/Response/ShadowResponse';
import {ReservationResponse} from '../../../core/Reservation/Application/DTO/ReservationResponse';
import {ClientResponse} from '../../../core/Client/Application/DTO/ClientResponse';

@Injectable()
export class SqliteGetShadowMap
    extends SqliteBaseClass
    implements ShadowMapDAO
{
    async get(seasonId: string): Promise<ShadowMapDTO> {
        const sql = `
            SELECT
                s.id AS id,
                s.identifier,
                s.type,
                s.x,
                s.y,
                r.id AS reservationId,
                r.state AS reservationState,
                r.checkIn,
                r.checkOut,
                c.id AS clientId,
                c.name,
                c.phone,
                c.email
            FROM Shadows s
                     LEFT JOIN Season_Shadows ss ON ss.shadowId = s.id
                     LEFT JOIN Reservations r ON r.shadowId = s.id and (CURRENT_TIMESTAMP BETWEEN r.checkIn and r.checkOut)
                     LEFT JOIN Clients c ON r.clientId = c.id
            WHERE ss.seasonId = @seasonId AND s.deleted_at IS NULL
        `;
        const results = this.getDb()
            .prepare(sql)
            .all({ seasonId: seasonId }) as any;
        return this.toDTO(results);
    }
    private toDTO(rows: any[]): ShadowMapDTO {
        const mapResponse = new ShadowMapDTO();
        mapResponse.map = [];

        rows.forEach((row) => {
            const shadow: ShadowResponse = {
                id: row.id,
                identifier: row.identifier,
                type: row.type,
                coords: {
                    x: row.x,
                    y: row.y,
                },
                state: row.reservationId ? 'occupied' : 'available',
            };

            const reservation: ReservationResponse | undefined = row.reservationId
                ? {
                    id: row.reservationId,
                    dates: {
                        checkIn: row.checkIn,
                        checkOut: row.checkOut,
                    },
                    duration: 0,
                    state: row.reservationState,
                }
                : undefined;

            const client: ClientResponse | undefined = row.clientId
                ? {
                    id: row.clientId,
                    name: row.name,
                    phone: row.phone,
                    email: row.email,
                }
                : undefined;

            mapResponse.map.push({
                shadow,
                reservation,
                client,
            });
        });

        return mapResponse;
    }
}
