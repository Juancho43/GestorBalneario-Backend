import {ReservationDetailResponse} from "../../Application/DTO/ReservationDetailResponse";

export interface GetReservationDetailsDAO{
    get(id:string): Promise<ReservationDetailResponse>
}