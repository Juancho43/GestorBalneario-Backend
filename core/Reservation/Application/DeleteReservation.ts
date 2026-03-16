import {IUseCase} from "../../common/Application/IUseCase";
import {DeleteReservationCommand} from "./DTO/DeleteReservationCommand";
import {DeleteReservationDAO} from "../Model/DAO/DeleteReservationDAO";

export class DeleteReservation implements IUseCase<DeleteReservationCommand, void>
{
    constructor(private readonly dao: DeleteReservationDAO) {
    }
    async execute(request: DeleteReservationCommand): Promise<void> {
        const result = await this.dao.delete(request.id);
        if (!result) {
            throw new Error('Reservation not found');
        }
    }
}