export class CreateReservationCommand{
    constructor(
        public shadowId: string,
        public clientId:string,
        public checkIn: string,
        public checkOut: string,
    ){}
}