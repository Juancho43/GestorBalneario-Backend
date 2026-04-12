import { Service } from '../Service';

export interface CreateServiceDAO {
  save(service: Service): Promise<void>;
}
