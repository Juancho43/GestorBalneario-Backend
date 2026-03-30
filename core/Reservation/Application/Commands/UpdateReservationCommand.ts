import {CreateReservationCommand} from "./CreateReservationCommand";

export class UpdateReservationCommand {
    /**
     * Id of the reservation to edit:w
     * */
    id: string;
    data:CreateReservationCommand;
    /*
  * Date of creation
  * @example: '2026-01-10'
  * */
    createdAt:string;
}
