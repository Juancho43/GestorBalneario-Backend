import {UUID} from '../../../common/Model/UUID';
import {InvoiceItem} from '../../Model/InvoiceItem';
import {Money} from '../../../Payment/Model/Money';
import {StringObject} from '../../../common/Model/StringObject';
import {Reservation_Service} from '../../../Service/Model/Reservation_Service';
import {Discount} from "../../../Service/Model/Discount";
import {Recharge} from "../../../Service/Model/Recharge";

export class CreateInvoiceItem {
  static create(
    type: string,
    price: number,
    description: string,
    serviceId: string,
    aggregateId: string,
    invoiceId: string,
    existingId?: string,
  ): InvoiceItem {
    let id = UUID.create();
    if(existingId !== undefined && existingId !== '') {
      id = UUID.restore(existingId);
    }
    const moneyPrice = Money.create(price);
    const descObject = StringObject.create(description);
    const sId = UUID.restore(serviceId);
    const aId = UUID.restore(aggregateId);
    const iId = UUID.restore(invoiceId);
    switch (type) {
      case 'RESERVATION':
        return Reservation_Service.create(
            id,
            moneyPrice,
            descObject,
            sId,
            aId,
            iId,
        );

      case 'DISCOUNT':
        return  Discount.create(
            id,
            moneyPrice,
            descObject,
            sId,
            aId,
            iId,
        );
      case 'RECHARGE':
        return  Recharge.create(
            id,
            moneyPrice,
            descObject,
            sId,
            aId,
            iId,
        );
      case 'Other':

      default:
        throw new Error(`Item type ${type} is not supported for invoicing.`);
    }
  }
}
