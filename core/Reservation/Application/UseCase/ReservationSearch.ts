import {ReservationSearchQuery} from "../Queries/ReservationSearchQuery";
import {IUseCase} from "../../../common/Application/IUseCase";
import {ReservationResponse} from "../DTO/ReservationResponse";
import {ReservationSearcherDAO} from "../../Model/DAO/ReservationSearcherDAO";

export class ReservationSearch implements IUseCase<
  ReservationSearchQuery,
  ReservationResponse[]
> {
  constructor(private persistence: ReservationSearcherDAO) {}

  execute(request: ReservationSearchQuery): Promise<ReservationResponse[]> {
    return this.persistence.search(request);
  }
}
