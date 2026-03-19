import {CreateReservationCommand} from "./CreateReservationCommand";

export class EditReservationCommand {
    /**
     * Id of the reservation to edit:w
     * */
    id: string;
    data:CreateReservationCommand;
}
