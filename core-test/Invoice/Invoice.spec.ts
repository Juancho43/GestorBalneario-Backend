import {Invoice} from '../../core/Invoice/Model/Invoice';
import {InvoiceItem} from '../../core/Invoice/Model/InvoiceItem';
import {IssuedState} from '../../core/Invoice/Model/IssuedState';
import {vi} from 'vitest';
import {Money} from '../../core/Payment/Model/Money';
import {PaymentMother} from '../mothers/PaymentMother';
import {InvoiceMother} from '../mothers/InvoiceMother';
import {MoneyMother} from '../mothers/MoneyMother';
import {PaidState} from '../../core/Invoice/Model/PaidState';

describe('Invoice Domain Entity', () => {
  let invoice: Invoice;
  let items: InvoiceItem[] = [];
  beforeEach(() => {
    invoice = InvoiceMother.create();
    items.push({
      getPrice: vi.fn().mockReturnValue(Money.create(10)),
    } as unknown as InvoiceItem);
  });
  const applyFullPaymentTo = (invoice: any) => {
    const mockItem = {
      getPrice: vi.fn().mockReturnValue(Money.create(10)),
    } as unknown as InvoiceItem;

    invoice.addItem(mockItem);

    for (let i = 0; i < 2; i++) {
      const payment = PaymentMother.create({
        money: MoneyMother.create({ amount: 5 }),
      });
      invoice.addPayment(payment);
    }
  };
  it('Should be created', () => {
    expect(invoice).toBeDefined();
    expect(invoice.state).toBeInstanceOf(IssuedState);
  });
  it('Should add items', () => {
    const mockItem: InvoiceItem = {
      getPrice: vi.fn().mockReturnValue(Money.create(10)),
    } as unknown as InvoiceItem;
    invoice.addItem(mockItem);
    expect(invoice['items'].length).toBe(1);
  });
  it('Should add payments', () => {
    const invoicePayments = InvoiceMother.create();
    items.push({
      getPrice: vi.fn().mockReturnValue(Money.create(10)),
    } as unknown as InvoiceItem);
    invoicePayments.addItem(items[0]);
    for (let i = 0; i < 3; i++) {
      const payment = PaymentMother.create({
        money: MoneyMother.create({ amount: 1 }),
      });
      invoicePayments.addPayment(payment);
    }
    expect(invoicePayments.payments.length).toBe(3);
  });
  it('Should calculate current debt', () => {
    const invoicePayments = InvoiceMother.create();
    items.push({
      getPrice: vi.fn().mockReturnValue(Money.create(10)),
    } as unknown as InvoiceItem);
    invoicePayments.addItem(items[0]);
    const debt = invoicePayments.calculateDebt()
    expect(debt).toBe(10);
  });
  it('Should change state to Paid when fully paid', () => {
    applyFullPaymentTo(invoice);
    expect(invoice.payments.length).toBe(2);
    expect(invoice.calculateTotalPaid()).toBe(10);
    expect(invoice.state).toBeInstanceOf(PaidState);
  });

  it('Should set a closeDate when fully paid', () => {
    expect(invoice.closeDate).toBeNull();
    applyFullPaymentTo(invoice);
    expect(invoice.closeDate).toBeDefined();
    expect(invoice.state).toBeInstanceOf(PaidState);
  });

  it('Should add an item', () => {
    const targetId = { value: 'uuid-1111-2222' } as any;
    const newItem = {
      getId: vi.fn().mockReturnValue(targetId),
      getPrice: vi.fn().mockReturnValue(MoneyMother.create({ amount: 25 })),
    } as unknown as InvoiceItem;

    invoice.addItem(newItem);

    expect(invoice.items.length).toBe(1);
    expect(invoice.items[0]).toBe(newItem);
  });

  it('Should update an item', () => {
    const targetId = { value: 'uuid-1234-5678' } as any;

    const initialItem = {
      getId: vi.fn().mockReturnValue(targetId),
      getPrice: vi.fn().mockReturnValue(MoneyMother.create({ amount: 10 })),
    } as unknown as InvoiceItem;

    invoice.addItem(initialItem);

    const updatedItem = {
      getId: vi.fn().mockReturnValue(targetId),
      getPrice: vi.fn().mockReturnValue(MoneyMother.create({ amount: 99 })),
    } as unknown as InvoiceItem;

    invoice.updateInvoiceItem(updatedItem);

    expect(invoice.items.length).toBe(1);
    expect(invoice.items[0]).toBe(updatedItem);
    expect(invoice.items[0].getPrice().finalAmount).toBe(99);
  });

  it('Should delete an item', () => {
    const targetId = { value: 'uuid-9876-5432' } as any;

    const itemToRemove = {
      getId: vi.fn().mockReturnValue(targetId),
      getPrice: vi.fn().mockReturnValue(MoneyMother.create({ amount: 50 })),
    } as unknown as InvoiceItem;

    invoice.addItem(itemToRemove);

    expect(invoice.items.length).toBe(1);

    invoice.deleteInvoiceItem(targetId);

    expect(invoice.items.length).toBe(0);
  });

});