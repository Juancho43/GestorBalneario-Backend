import {IssuedState} from '../../../core/Invoice/Model/IssuedState';
import {Invoice} from '../../../core/Invoice/Model/Invoice';
import {UUID} from '../../../core/common/Model/UUID';
import {Timestamps} from '../../../core/common/Model/Timestamps';
import {SoftDelete} from '../../../core/common/Model/SoftDelete';
import {InvoiceItem} from '../../../core/Invoice/Model/InvoiceItem';
import {Money} from '../../../core/Payment/Model/Money';
import {vi} from 'vitest';
import {MoneyMother} from "../../mothers/MoneyMother";
import {EntityNotFoundError} from "../../../core/common/Model/Errors/EntityNotFound";

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
  it('Should modify an item', () => {
    const targetId = 'uuid-1234-5678';

    const initialItem = {
      getId: vi.fn().mockReturnValue({ value: targetId }),
      getPrice: vi.fn().mockReturnValue(MoneyMother.create({ amount: 10 })),
    } as unknown as InvoiceItem;

    model.addItem(initialItem);

    const updatedItem = {
      getId: vi.fn().mockReturnValue({ value: targetId }),
      getPrice: vi.fn().mockReturnValue(MoneyMother.create({ amount: 99 })),
    } as unknown as InvoiceItem;

    model.updateItem(updatedItem);

    const items = model.getInvoice().items;
    expect(items.length).toBe(1);
    expect(items[0]).toBe(updatedItem);
  });
  it('Should remove an item', () => {
    const targetId = 'uuid-9876-5432';

    const itemToRemove = {
      getId: vi.fn().mockReturnValue({ value: targetId }),
      getPrice: vi.fn().mockReturnValue(MoneyMother.create({ amount: 50 })),
    } as unknown as InvoiceItem;

    model.addItem(itemToRemove);

    expect(model.getInvoice().items.length).toBe(1);

    model.removeItem(itemToRemove.getId());

    expect(model.getInvoice().items.length).toBe(0);
  });
  it('Should throw an error if the item to update does not exist', () => {
    const targetId = 'uuid-9876-5432';

    const itemToRemove = {
      getId: vi.fn().mockReturnValue({ value: targetId }),
      getPrice: vi.fn().mockReturnValue(MoneyMother.create({ amount: 50 })),
    } as unknown as InvoiceItem;
    expect(() => model.updateItem(itemToRemove)).toThrow(EntityNotFoundError);
  })
  it('Should throw an error if the item to delete does not exist', () => {
    const targetId = 'uuid-9876-5432';

    const itemToRemove = {
      getId: vi.fn().mockReturnValue({ value: targetId }),
      getPrice: vi.fn().mockReturnValue(MoneyMother.create({ amount: 50 })),
    } as unknown as InvoiceItem;
    expect(() => model.removeItem(itemToRemove.getId())).toThrow(EntityNotFoundError)
  })
});
