import {Reservation} from "../Reservation";
import {Client} from "../../../Client/Model/Client";

export interface GetReservationWithClientDAO {
    get(id:string): Promise<{client: Client, reservation: Reservation}>
}