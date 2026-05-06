import {IssuedState} from '../../../core/Invoice/Model/IssuedState';
import {Invoice} from '../../../core/Invoice/Model/Invoice';
import {UUID} from '../../../core/common/Model/UUID';
import {Timestamps} from '../../../core/common/Model/Timestamps';
import {SoftDelete} from '../../../core/common/Model/SoftDelete';
import {InvoiceItem} from '../../../core/Invoice/Model/InvoiceItem';
import {Money} from '../../../core/Payment/Model/Money';
import {vi} from 'vitest';

describe('IssuedState Model', () => {
  let model: IssuedState;
  beforeEach(() => {
    const invoice = Invoice.create(
      UUID.create(),
      new Date(),
      UUID.create(),
      Timestamps.create(),
      SoftDelete.empty(),
    );
    model = new IssuedState(invoice);
  });
  it('Should be created', () => {
    expect(model).toBeDefined();
    expect(model.getInvoice()).toBeInstanceOf(Invoice);
  });
  it('Should add items', () => {
    const item: InvoiceItem = {
      getPrice: vi.fn().mockReturnValue(Money.create(10)),
    } as unknown as InvoiceItem;
    model.addItem(item);
    expect(model.getInvoice().items.length).toBe(1);
  });
});
