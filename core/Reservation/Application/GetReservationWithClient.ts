import {IUseCase} from "../../common/Application/IUseCase";
import {ReservationWithClientResponse} from "./DTO/ReservationWithClientResponse";
import {GetReservationWithClientDAO} from "../Model/DAO/GetReservationWithClientDAO";
import {GetReservationQuery} from "./DTO/GetReservationQuery";

export class GetReservationWithClient implements IUseCase<GetReservationQuery, ReservationWithClientResponse>{
    constructor(private dao: GetReservationWithClientDAO) {}
    async execute(request: GetReservationQuery): Promise<ReservationWithClientResponse> {
        return  ReservationWithClientResponse.create(await this.dao.get(request.id));
    }

}