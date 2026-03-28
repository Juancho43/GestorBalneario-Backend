import {ShadowResponse} from "./ShadowResponse";
import {ReservationResponse} from "../../../Reservation/Application/DTO/ReservationResponse";
import {ClientResponse} from "../../../Client/Application/DTO/ClientResponse";

export class ShadowMapDTO {
    map:{
        shadow: ShadowResponse;
        reservation?: ReservationResponse;
        client?: ClientResponse;
    }[]
}