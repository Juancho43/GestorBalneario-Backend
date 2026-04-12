import { SeasonShadowsServicesDTO } from '../DTO/SeasonShadowsServicesDTO';

export interface GetSeasonShadowsServicesDAO {
  get(seasonId: string): Promise<SeasonShadowsServicesDTO>;
}
