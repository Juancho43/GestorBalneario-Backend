import {Reservation} from "../Reservation";

export interface GetActiveReservationsDAO{
    get() : Reservation[]
}