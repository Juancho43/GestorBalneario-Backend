import { ShadowMapDTO } from '../Response/ShadowMapDTO';

export interface ShadowMapDAO {
  get(seasonId: string): Promise<ShadowMapDTO>;
}
