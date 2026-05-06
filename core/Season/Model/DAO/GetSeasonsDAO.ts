import {Season} from '../Season';
import {GetSeasonsHistoryQuery} from '../../Application/Queries/GetSeasonsHistoryQuery';

export interface GetSeasonsDAO {
  get(query: GetSeasonsHistoryQuery): Promise<Season[]>;
}
