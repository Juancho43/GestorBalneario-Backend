import {Shadow} from '../../../Model/Shadow';
import {IUseCase} from '../../../../common/Application/IUseCase';
import {GetShadowDAO} from '../../../Model/DAO/GetShadowDAO';
import {EntityNotFoundError} from '../../../../common/Model/Errors/EntityNotFound';
import {GetByIdQuery} from '../../../../common/Application/GetByIdQuery';

export class GetShadow implements IUseCase<GetByIdQuery, Shadow> {
  constructor(private dao: GetShadowDAO) {}
  async execute(request: GetByIdQuery): Promise<Shadow> {
    const entity = await this.dao.get(request.id);
    if (!entity) {
      throw new EntityNotFoundError(Shadow.name, request.id);
    }
    return entity;
  }
}
