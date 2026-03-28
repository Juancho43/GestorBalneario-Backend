import {ReservationResponse} from "../../../Reservation/Application/DTO/ReservationResponse";
import {ShadowResponse} from "./ShadowResponse";

export class ShadowHistoryDTO{
    shadow:ShadowResponse;
    reservations:ReservationResponse[];
}