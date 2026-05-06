import {Client} from '../Client';

export interface DeleteClientDAO {
  delete(client: Client): Promise<void>;
}
