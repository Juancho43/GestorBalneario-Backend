import {IUseCase} from '../../../common/Application/IUseCase';
import {ShadowMapDTO} from '../Response/ShadowMapDTO';
import {ShadowMapDAO} from '../Interfaces/ShadowMapDAO';

export class GetShadowMap implements IUseCase<string, ShadowMapDTO> {
  constructor(private dao: ShadowMapDAO) {}

  async execute(seasonId: string): Promise<ShadowMapDTO> {
    return await this.dao.get(seasonId);
  }
}
