import {IUseCase} from "../../../common/Application/IUseCase";
import {Reservation} from "../../Model/Reservation";
import {GetSeasonEntityQuery} from "../../../Service/Application/Queries/GetSeasonEntityQuery";
import {GetSeasonReservationsDAO} from "../Interfaces/GetSeasonReservationsDAO";

export class GetSeasonReservations implements IUseCase<GetSeasonEntityQuery,Reservation[]> {

    constructor(private dao: GetSeasonReservationsDAO) {
    }

    async execute(request: GetSeasonEntityQuery): Promise<Reservation[]> {
        return await this.dao.get(request);
    }

}