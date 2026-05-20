import {IUseCase} from '../../../common/Application/IUseCase';
import {Reservation} from '../../Model/Reservation';
import {GetActiveReservationsDAO} from '../Interfaces/GetActiveReservationsDAO';
import {ReservationResponse} from "../DTO/ReservationResponse";
import {PaginatedQuery} from "../../../common/Application/PaginatedQuery";

export class GetActiveReservations implements IUseCase<PaginatedQuery, ReservationResponse[]> {
  constructor(private readonly dao: GetActiveReservationsDAO) {}

  async execute(request: PaginatedQuery): Promise<ReservationResponse[]> {
    return this.dao.get(request);
  }
}
