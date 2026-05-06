import {Season} from '../../Model/Season';
import {IUseCase} from '../../../common/Application/IUseCase';
import {GetSeasonsDAO} from '../../Model/DAO/GetSeasonsDAO';
import {GetSeasonsHistoryQuery} from '../Queries/GetSeasonsHistoryQuery';

export class GetSeasonsHistory implements IUseCase<
  GetSeasonsHistoryQuery,
  Season[]
> {
  constructor(private persistance: GetSeasonsDAO) {}

  async execute(request: GetSeasonsHistoryQuery): Promise<Season[]> {
    return this.persistance.get(request);
  }
}
