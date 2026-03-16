import {Reservation} from "../Reservation";

export interface CreateReservationDAO{
    save(reservation: Reservation): Promise<void>
}