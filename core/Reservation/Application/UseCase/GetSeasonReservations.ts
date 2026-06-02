import {IUseCase} from "../../../common/Application/IUseCase";
import {GetSeasonEntityQuery} from "../../../Service/Application/Queries/GetSeasonEntityQuery";
import {GetSeasonReservationsDAO} from "../Interfaces/GetSeasonReservationsDAO";
import {ReservationResponse} from "../DTO/ReservationResponse";

export class GetSeasonReservations implements IUseCase<GetSeasonEntityQuery,ReservationResponse[]> {

    constructor(private dao: GetSeasonReservationsDAO) {
    }

    async execute(request: GetSeasonEntityQuery): Promise<ReservationResponse[]> {
        return await this.dao.get(request);
    }

}