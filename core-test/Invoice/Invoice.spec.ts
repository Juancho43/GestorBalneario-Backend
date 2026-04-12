import { Invoice } from '../../core/Invoice/Model/Invoice';
import { InvoiceItem } from '../../core/Invoice/Model/InvoiceItem';
import { IssuedState } from '../../core/Invoice/Model/IssuedState';
import { vi } from 'vitest';
import { Money } from '../../core/Payment/Model/Money';
import { Payment } from '../../core/Payment/Model/Payment';
import { PaymentMother } from '../mothers/PaymentMother';
import { InvoiceMother } from '../mothers/InvoiceMother';
import { MoneyMother } from '../mothers/MoneyMother';
import { PaidState } from '../../core/Invoice/Model/PaidState';

describe('Invoice Domain Entity', () => {
  let invoice: Invoice;
  let items: InvoiceItem[] = [];
  beforeEach(() => {
    invoice = InvoiceMother.create();
    items.push({
      getPrice: vi.fn().mockReturnValue(Money.create(10)),
    } as unknown as InvoiceItem);
  });
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
    expect(invoicePayments.calculateDebt()).toBe(10);
  });
  it('Should change state when its fully paid', () => {
    const invoicePayments = InvoiceMother.create();
    items.push({
      getPrice: vi.fn().mockReturnValue(Money.create(10)),
    } as unknown as InvoiceItem);
    invoicePayments.addItem(items[0]);
    for (let i = 0; i < 2; i++) {
      const payment = PaymentMother.create({
        money: MoneyMother.create({ amount: 5 }),
      });
      invoicePayments.addPayment(payment);
    }
    expect(invoicePayments.payments.length).toBe(2);
    expect(invoicePayments.calculateTotalPaid()).toBe(10);
    expect(invoicePayments.state).toBeInstanceOf(PaidState);
  });
});
