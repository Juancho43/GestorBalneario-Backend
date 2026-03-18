import {IUseCase} from "../../common/Application/IUseCase";
import {Reservation} from "../Model/Reservation";
import {GetActiveReservationsDAO} from "../Model/DAO/GetActiveReservationsDAO";

export class GetActiveReservations implements IUseCase<any, Reservation[]>{
    constructor(private readonly dao: GetActiveReservationsDAO) {}

    async execute(request: any): Promise<Reservation[]> {
        return this.dao.get();
    }
}