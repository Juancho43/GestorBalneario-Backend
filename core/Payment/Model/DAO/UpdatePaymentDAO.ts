import { Payment } from '../Payment';

export interface UpdatePaymentDAO {
  update(payment: Payment): Promise<void>;
}
