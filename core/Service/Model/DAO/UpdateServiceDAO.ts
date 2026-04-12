import { Service } from '../Service';

export interface UpdateServiceDAO {
  update(entity: Service): Promise<void>;
}
