import {IUseCase} from "../../common/Application/IUseCase";
import {GetReservationQuery} from "./DTO/GetReservationQuery";
import {GetReservationDAO} from "../Model/DAO/GetReservationDAO";
import {Reservation} from "../Model/Reservation";

export class GetReservation implements IUseCase<GetReservationQuery, Reservation>{
    constructor(private dao: GetReservationDAO) {
    }

    async execute(request: GetReservationQuery): Promise<Reservation> {
        const result = await this.dao.get(request.id);
        if (!result) {
            throw new Error('Reservation not found');
        }
        return result;
    }

}