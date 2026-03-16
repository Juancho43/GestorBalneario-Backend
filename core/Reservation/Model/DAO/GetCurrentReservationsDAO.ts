import {GetCurrentReservationsQuery} from "../../Application/DTO/GetCurrentReservationsQuery";
import {Reservation} from "../Reservation";

export interface GetCurrentReservationsDAO{
    get(query: GetCurrentReservationsQuery) : Promise<Reservation[]>;
}