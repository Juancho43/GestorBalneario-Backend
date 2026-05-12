import {IUseCase} from '../../../common/Application/IUseCase';
import {SeasonServiceDTO} from '../DTO/SeasonServiceDTO';
import {SeasonServiceDAO} from '../Interfaces/SeasonServiceDAO';
import {GetSeasonEntityQuery} from '../Queries/GetSeasonEntityQuery';
import {GetSeasonServicesQuery} from "../Queries/GetSeasonServicesQuery";

export class GetSeasonServices implements IUseCase<
  GetSeasonServicesQuery,
  SeasonServiceDTO
> {
  constructor(private persistance: SeasonServiceDAO) {}

  execute(request: GetSeasonServicesQuery): Promise<SeasonServiceDTO> {
    return this.persistance.get(request);
  }
}
