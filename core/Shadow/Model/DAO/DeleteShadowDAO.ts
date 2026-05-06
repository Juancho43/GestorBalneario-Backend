import {Shadow} from '../Shadow';

export interface DeleteShadowDAO {
  delete(entity: Shadow): Promise<void>;
}
