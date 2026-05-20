import {GetSeasonEntityQuery} from "../../../Service/Application/Queries/GetSeasonEntityQuery";
import {ReservationResponse} from "../DTO/ReservationResponse";

export interface GetSeasonReservationsDAO {
    get(query: GetSeasonEntityQuery): Promise<ReservationResponse[]>;
}