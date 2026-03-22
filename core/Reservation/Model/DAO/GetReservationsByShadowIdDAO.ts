import {Reservation} from "../Reservation";

export interface GetReservationsByShadowIdDAO{
    get(shadowId: string) : Promise<Reservation[]>
}