import {IUseCase} from '../../../common/Application/IUseCase';
import {SeasonServiceDTO} from '../DTO/SeasonServiceDTO';
import {SeasonServiceDAO} from '../Interfaces/SeasonServiceDAO';
import {GetSeasonEntityQuery} from '../Queries/GetSeasonEntityQuery';

export class GetSeasonServices implements IUseCase<
  GetSeasonEntityQuery,
  SeasonServiceDTO
> {
  constructor(private persistance: SeasonServiceDAO) {}

  execute(request: GetSeasonEntityQuery): Promise<SeasonServiceDTO> {
    return this.persistance.get(request);
  }
}
