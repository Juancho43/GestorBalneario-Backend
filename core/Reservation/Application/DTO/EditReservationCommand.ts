import {CreateReservationCommand} from "./CreateReservationCommand";

export class EditReservationCommand {
    constructor(
        public id:string,
        public data: CreateReservationCommand
    ){
    }
}