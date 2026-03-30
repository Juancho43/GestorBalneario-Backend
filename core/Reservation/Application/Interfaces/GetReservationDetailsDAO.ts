import {ReservationDetailResponse} from "../DTO/ReservationDetailResponse";

export interface GetReservationDetailsDAO{
    get(id:string): Promise<ReservationDetailResponse>
}