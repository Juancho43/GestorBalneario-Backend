import { BaseError } from '../../common/Model/BaseError';

export class NotAvailableDate extends BaseError {
  constructor(startDate: string, endDate: string) {
    super(`Dates ${startDate} and ${endDate} are not avaiable`, 400);
  }
}
