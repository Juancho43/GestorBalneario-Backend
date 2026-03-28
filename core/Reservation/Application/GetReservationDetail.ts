import {IUseCase} from "../../common/Application/IUseCase";
import {GetReservationQuery} from "./DTO/GetReservationQuery";
import {ReservationDetailResponse} from "./DTO/ReservationDetailResponse";
import {GetReservationDetailsDAO} from "../Model/DAO/GetReservationDetailsDAO";

export class GetReservationDetail implements IUseCase<GetReservationQuery, ReservationDetailResponse>{

    constructor(private dao: GetReservationDetailsDAO) {
    }

    execute(request: GetReservationQuery): Promise<ReservationDetailResponse> {
        return this.dao.get(request.id);
    }

}