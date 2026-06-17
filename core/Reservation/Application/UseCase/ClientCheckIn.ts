import {GetReservationDAO} from "../../Model/DAO/GetReservationDAO";
import {GetShadowDAO} from "../../../Shadow/Model/DAO/GetShadowDAO";
import {IUseCase} from "../../../common/Application/IUseCase";
import {GetByIdQuery} from "../../../common/Application/GetByIdQuery";
import {Reservation} from "../../Model/Reservation";
import {GetClientDAO} from "../../../Client/Model/DAO/GetClientDAO";
import {UpdateReservationDAO} from "../../Model/DAO/UpdateReservationDAO";
import {EntityNotFoundError} from "../../../common/Model/Errors/EntityNotFound";
import {Shadow} from "../../../Shadow/Model/Shadow";
import {Client} from "../../../Client/Model/Client";

export class ClientCheckIn implements IUseCase<GetByIdQuery,Reservation> {

    constructor(
        private readonly  dao : GetReservationDAO,
        private readonly clientDao : GetClientDAO,
        private readonly shadowDao : GetShadowDAO,
        private readonly updateDao: UpdateReservationDAO,
    ) {
    }

    async execute(request: GetByIdQuery): Promise<Reservation> {
        const reservation = await this.dao.get(request.id);
        if(!reservation){
            throw new EntityNotFoundError(Reservation.name,request.id)
        }
        const [client, shadow] = await Promise.all([
            this.clientDao.get(reservation.client.value),
            this.shadowDao.get(reservation.shadow.value)
        ])
        if (!client) {
            throw new EntityNotFoundError(Client.name, reservation.client.value);
        }
        if (!shadow) {
            throw new EntityNotFoundError(Shadow.name, reservation.shadow.value);
        }
        reservation.clientCheckIn(client,shadow);
        await this.updateDao.update(reservation);
        return reservation;
    }
}