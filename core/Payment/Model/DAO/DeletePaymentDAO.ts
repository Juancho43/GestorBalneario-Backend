import { Payment } from '../Payment';

export interface DeletePaymentDAO {
  delete(entity: Payment): Promise<void>;
}
