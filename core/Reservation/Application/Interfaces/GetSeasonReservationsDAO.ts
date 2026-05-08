import {Reservation} from "../../Model/Reservation";
import {GetSeasonEntityQuery} from "../../../Service/Application/Queries/GetSeasonEntityQuery";

export interface GetSeasonReservationsDAO {
    get(query: GetSeasonEntityQuery): Promise<Reservation[]>;
}