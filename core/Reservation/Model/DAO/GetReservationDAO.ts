import {Reservation} from "../Reservation";

export interface GetReservationDAO{
    get(id: string): Promise<Reservation | null>
}