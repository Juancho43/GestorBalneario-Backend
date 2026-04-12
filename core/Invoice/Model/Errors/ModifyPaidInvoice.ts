import { BaseError } from '../../../common/Model/BaseError';

export class ModifyPaidInvoiceError extends BaseError {
  constructor(message: string) {
    super(`Cannot modify a paid invoice. ${message}`, 403);
  }
}
