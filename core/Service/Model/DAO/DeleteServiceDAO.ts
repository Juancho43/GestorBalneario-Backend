import { Service } from '../Service';

export interface DeleteServiceDAO {
  delete(entity: Service): Promise<void>;
}
