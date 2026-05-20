import {ReservationResponse} from "../DTO/ReservationResponse";
import {PaginatedQuery} from "../../../common/Application/PaginatedQuery";

export interface GetActiveReservationsDAO {
  get(query: PaginatedQuery): Promise<ReservationResponse[]>;
}
