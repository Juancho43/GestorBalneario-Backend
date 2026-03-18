import {Shadow} from "../../Model/Shadow";
import {ReservationResponse} from "../../../Reservation/Application/DTO/ReservationResponse";

export class ShadowResponse{
      static create(shadow: Shadow, includeReservation: boolean = true){
          const response: any = {
              id: shadow.id,
              identifier: shadow.identifier.getValue(),
              type: shadow.type.type,
              coords: shadow.coords,
              state: shadow.state.state,
          }

          if(includeReservation && shadow.currentReservation){
              response.currentReservation = ReservationResponse.create(shadow.currentReservation, false);
          } else {
              response.currentReservation = null;
          }

          return response;
      }
    static createList(shadows: Shadow[]){
        return shadows.map((shadow) => {
            return ShadowResponse.create(shadow);
        })
    }
}