import { CreatePaymentDAO } from '../../../core/Payment/Model/DAO/CreatePaymentDAO';
import { Inject, Injectable } from '@nestjs/common';
import { DB_PROVIDER } from '../../database/DBPROVIDER';
import { Payment } from 'core/Payment/Model/Payment';
import { UpdatePaymentDAO } from '../../../core/Payment/Model/DAO/UpdatePaymentDAO';
import { SqliteBaseClass } from '../../database/SqliteBaseClass';

@Injectable()
export class SqliteUpdatePayment
  extends SqliteBaseClass
  implements UpdatePaymentDAO
{
  update(payment: Payment): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
