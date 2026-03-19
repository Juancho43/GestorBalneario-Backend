import {Shadow} from "../../Model/Shadow";
import {ReservationResponse} from "../../../Reservation/Application/DTO/ReservationResponse";

export class ShadowResponse{

    /**
     * Unique identifier for the shadow
     * @example "shadow-123"
     * */
    id:string;

    /**
     * Identifier for the shadow
     * @example "S1"
     * */
    identifier: string;

    /**
     * Type of the shadow
     * @example "Sombrilla"
     * */
    type: string;

    /**
     * Coordinates of the shadow for the canvas.
     * @example "{x: 100, y: 200}"
     * */
    coords: {x:number, y:number};
    /**
     * Current state of the shadow
     * @example "available"
     * */
    state: string;

    currentReservation?: ReservationResponse;

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