import { UUID } from '../../../common/Model/UUID';
import { InvoiceItem } from '../../Model/InvoiceItem';
import { Money } from '../../../Payment/Model/Money';
import { StringObject } from '../../../common/Model/StringObject';
import { Reservation_Service } from '../../../Service/Model/Reservation_Service';

export class CreateInvoiceItem {
  static create(
    type: string,
    price: number,
    description: string,
    serviceId: string,
    aggregateId: string,
    invoiceId: UUID,
  ): InvoiceItem {
    const id = UUID.create();
    const moneyPrice = Money.create(price);
    const descObject = StringObject.create(description);
    const sId = UUID.restore(serviceId);
    const aId = UUID.restore(aggregateId);

    switch (type) {
      case 'RESERVATION':
        return Reservation_Service.create(
          id,
          moneyPrice,
          descObject,
          sId,
          aId,
          invoiceId,
        );

      case 'PRODUCT_PURCHASE':
      // Return a different implementation of InvoiceItem
      // return Product_Service.create(id, moneyPrice, descObject, sId, aId, invoiceId);

      case 'LATE_FEE':
      // return Fee_Service.create(...);

      default:
        throw new Error(`Item type ${type} is not supported for invoicing.`);
    }
  }
}
