import {IUseCase} from '../../../../common/Application/IUseCase';
import {Season} from '../../../Model/Season';
import {GetSeasonDAO} from '../../../Model/DAO/GetSeasonDAO';
import {EntityNotFoundError} from '../../../../common/Model/Errors/EntityNotFound';
import {GetByIdQuery} from '../../../../common/Application/GetByIdQuery';

export class GetSeason implements IUseCase<GetByIdQuery, Season> {
  constructor(private dao: GetSeasonDAO) {}
  async execute(request: GetByIdQuery): Promise<Season> {
    const entity = await this.dao.get(request.id);
    if (!entity) {
      throw new EntityNotFoundError(Season.name, request.id);
    }
    return entity;
  }
}
