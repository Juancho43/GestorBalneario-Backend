import {IUseCase} from '../../../../common/Application/IUseCase';
import {Shadow} from '../../../Model/Shadow';
import {UpdateShadowCommand} from '../../Command/UpdateShadowCommand';
import {StringObject} from '../../../../common/Model/StringObject';
import {Coords} from '../../../../common/Model/Coords';
import {UpdateShadowDAO} from '../../../Model/DAO/UpdateShadowDAO';
import {ActiveSeasonDAO} from '../../../../Season/Application/Interfaces/ActiveSeasonDAO';
import {GetShadowDAO} from '../../../Model/DAO/GetShadowDAO';
import {EntityNotFoundError} from '../../../../common/Model/Errors/EntityNotFound';

export class UpdateShadow implements IUseCase<UpdateShadowCommand, Shadow> {
  constructor(
    private readonly updateDao: UpdateShadowDAO,
    private readonly getDao: GetShadowDAO,
    private readonly currentSeason: ActiveSeasonDAO,
  ) {}

  async execute(request: UpdateShadowCommand): Promise<Shadow> {
    const existingEntity = await this.getDao.get(request.id);
    if (!existingEntity) {
      throw new EntityNotFoundError('Shadow', request.id);
    }

    const season = await this.currentSeason.get();

    existingEntity.update();
    const shadow = Shadow.create(
      existingEntity.id,
      season.id,
      StringObject.create(request.data.identifier),
      existingEntity.type,
      Coords.create(request.data.coords.x, request.data.coords.y),
      existingEntity.getTimestamps(),
      existingEntity.getSoftDelete(),
    );
    await this.updateDao.update(shadow);
    return shadow;
  }
}
