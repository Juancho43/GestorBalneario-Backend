import { IUseCase } from '../../../../common/Application/IUseCase';
import { CreateShadowCommand } from '../../Command/CreateShadowCommand';
import { Shadow } from '../../../Model/Shadow';
import { StringObject } from '../../../../common/Model/StringObject';
import { ShadowType } from '../../../Model/ValueObjects/ShadowType';
import { Coords } from '../../../../common/Model/Coords';
import { Timestamps } from '../../../../common/Model/Timestamps';
import { SoftDelete } from '../../../../common/Model/SoftDelete';
import { UUID } from '../../../../common/Model/UUID';
import { CreateShadowDAO } from '../../../Model/DAO/CreateShadowDAO';
import { ActiveSeasonDAO } from '../../../../Season/Application/Interfaces/ActiveSeasonDAO';

export class CreateShadow implements IUseCase<CreateShadowCommand, Shadow> {
  constructor(
    private readonly persist: CreateShadowDAO,
    private readonly currentSeason: ActiveSeasonDAO,
  ) {}
  async execute(request: CreateShadowCommand): Promise<Shadow> {
    const season = await this.currentSeason.get();
    const shadow = Shadow.create(
      UUID.create(),
      season.id,
      StringObject.create(request.identifier),
      ShadowType.create(request.type),
      Coords.create(request.coords.x, request.coords.y),
      Timestamps.create(),
      SoftDelete.empty(),
    );

    await this.persist.save(shadow);
    return shadow;
  }
}
