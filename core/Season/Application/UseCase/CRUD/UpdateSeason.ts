import { IUseCase } from '../../../../common/Application/IUseCase';
import { Season } from '../../../Model/Season';
import { GetSeasonDAO } from '../../../Model/DAO/GetSeasonDAO';
import { EntityNotFoundError } from '../../../../common/Model/Errors/EntityNotFound';
import { UpdateSeasonDAO } from '../../../Model/DAO/UpdateSeasonDAO';
import { UpdateSeasonCommand } from '../../Commads/UpdateSeasonCommand';
import { StringObject } from '../../../../common/Model/StringObject';

export class UpdateSeason implements IUseCase<UpdateSeasonCommand, Season> {
  constructor(
    private readonly updateDao: UpdateSeasonDAO,
    private readonly getDao: GetSeasonDAO,
  ) {}

  async execute(request: UpdateSeasonCommand): Promise<Season> {
    const existingEntity = await this.getDao.get(request.id);
    if (!existingEntity) {
      throw new EntityNotFoundError('Season', request.id);
    }
    existingEntity.update();
    //Only change the name.
    const season = Season.create(
      existingEntity.id,
      existingEntity.isActive,
      existingEntity.startDate,
      existingEntity.endDate,
      StringObject.create(request.data.name),
      existingEntity.getTimestamps(),
      existingEntity.getSoftDelete(),
    );
    await this.updateDao.update(season);

    return season;
  }
}
