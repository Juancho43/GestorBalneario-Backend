import {Reservation} from "../Reservation";

export interface UpdateReservationDAO{
    update(reservation: Reservation) : Promise<boolean>
}