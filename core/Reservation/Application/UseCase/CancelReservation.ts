import {Reservation} from "../../Model/Reservation";
import {GetByIdQuery} from "../../../common/Application/GetByIdQuery";
import {IUseCase} from "../../../common/Application/IUseCase";
import {EntityNotFoundError} from "../../../common/Model/Errors/EntityNotFound";
import {GetReservationDAO} from "../../Model/DAO/GetReservationDAO";

export class CancelReservation implements IUseCase<GetByIdQuery,Reservation> {

    constructor(
        private readonly  dao : GetReservationDAO
    ) {
    }

    async execute(request: GetByIdQuery): Promise<Reservation> {
        const reservation = await this.dao.get(request.id);
        if(!reservation){
            throw new EntityNotFoundError(Reservation.name,request.id)
        }
        reservation.cancel();
        return reservation;
    }

}