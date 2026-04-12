import { Season } from '../../Model/Season';

export interface ActiveSeasonDAO {
  get(): Promise<Season>;
}
