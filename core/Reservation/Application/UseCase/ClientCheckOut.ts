import {IUseCase} from "../../../common/Application/IUseCase";
import {GetByIdQuery} from "../../../common/Application/GetByIdQuery";
import {Reservation} from "../../Model/Reservation";
import {GetReservationDAO} from "../../Model/DAO/GetReservationDAO";
import {GetClientDAO} from "../../../Client/Model/DAO/GetClientDAO";
import {UpdateReservationDAO} from "../../Model/DAO/UpdateReservationDAO";
import {EntityNotFoundError} from "../../../common/Model/Errors/EntityNotFound";
import {Client} from "../../../Client/Model/Client";

export class ClientCheckOut implements IUseCase<GetByIdQuery,Reservation> {

    constructor(
        private readonly  dao : GetReservationDAO,
        private readonly clientDao : GetClientDAO,
        private readonly updateDao: UpdateReservationDAO,
    ) {
    }

    async execute(request: GetByIdQuery): Promise<Reservation> {
        const reservation = await this.dao.get(request.id);
        if(!reservation){
            throw new EntityNotFoundError(Reservation.name,request.id)
        }
        const client =   await this.clientDao.get(reservation.client.value)
        if (!client) {
            throw new EntityNotFoundError(Client.name, reservation.client.value);
        }
        reservation.clientCheckOut(client);
        await this.updateDao.update(reservation);
        return reservation;
    }
}
