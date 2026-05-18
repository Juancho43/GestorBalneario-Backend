import {PaidState} from '../../../core/Invoice/Model/PaidState';
import {Invoice} from '../../../core/Invoice/Model/Invoice';
import {UUID} from '../../../core/common/Model/UUID';
import {Timestamps} from '../../../core/common/Model/Timestamps';
import {SoftDelete} from '../../../core/common/Model/SoftDelete';
import {ModifyPaidInvoiceError} from '../../../core/Invoice/Model/Errors/ModifyPaidInvoice';

describe('PaidState Model', () => {
  let model: PaidState;
  beforeEach(() => {
    const invoice = Invoice.create(
      UUID.create(),
      new Date(),
      UUID.create(),
      Timestamps.create(),
      SoftDelete.empty(),
    );
    model = new PaidState(invoice);
  });
  it('should be created', () => {
    expect(model).toBeDefined();
    expect(model.getInvoice()).toBeInstanceOf(Invoice);
  });
  it('Should not add items', () => {
    expect(() => model.addItem({} as any)).toThrow(ModifyPaidInvoiceError);
  });
  it('Should not add payments', () => {
    expect(() => model.addPayment({} as any)).toThrow(ModifyPaidInvoiceError);
  });
  it('Should not modify items', () => {
    expect(() => model.updateItem({} as any)).toThrow(ModifyPaidInvoiceError);
  })
  it('Should not remove items', () => {
    expect(() => model.removeItem({} as any)).toThrow(ModifyPaidInvoiceError);
  })
  it('Should not detele the invoice',()=>{
    expect(() => model.delete()).toThrow(ModifyPaidInvoiceError);
  })
  it('Should not modify the invoice', () => {
    expect(() => model.update()).toThrow(ModifyPaidInvoiceError);
  })
});
