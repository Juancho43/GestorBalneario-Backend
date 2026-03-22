import {ReservationResponse} from "./ReservationResponse";
import {ClientResponse} from "../../../Client/Application/DTO/ClientResponse";
import {Client} from "../../../Client/Model/Client";
import {Reservation} from "../../Model/Reservation";

export class ReservationWithClientResponse{
    reservation: ReservationResponse;
    client: ClientResponse;

    static create(data:{client: Client, reservation: Reservation}){
        const response = new ReservationWithClientResponse();
        response.client = ClientResponse.create(data.client);
        response.reservation = ReservationResponse.create(data.reservation);
        return response;
    }
    static createList(data:{client: Client, reservation: Reservation}[]){
     return data.map(item => ReservationWithClientResponse.create(item));
    }
}