import {ReservationResponse} from "../../Application/DTO/ReservationResponse";
import {ReservationSearchQuery} from "../../Application/Queries/ReservationSearchQuery";

export interface ReservationSearcherDAO {
    search(query: ReservationSearchQuery): Promise<ReservationResponse[]>;
}