import {IUseCase} from "../../common/Application/IUseCase";
import {GetCurrentReservationsQuery} from "./DTO/GetCurrentReservationsQuery";
import {Reservation} from "../Model/Reservation";
import {GetCurrentReservationsDAO} from "../Model/DAO/GetCurrentReservationsDAO";

export class GetCurrentReservations implements IUseCase<GetCurrentReservationsQuery, Reservation[]>{
    constructor(private dao: GetCurrentReservationsDAO) {
    }
    async execute(request: GetCurrentReservationsQuery): Promise<Reservation[]> {
        return await this.dao.get(request);
    }

}