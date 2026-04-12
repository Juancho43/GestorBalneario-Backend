import { PaymentMother } from '../mothers/PaymentMother';
import { MoneyMother } from '../mothers/MoneyMother';
import { StringObject } from '../../core/common/Model/StringObject';
import { PaymentTypeMother } from '../mothers/PaymentTypeMother';

describe('Payment Domain Entity', () => {
  it('should be created', () => {
    const payment = PaymentMother.create({
      money: MoneyMother.create({ amount: 100 }),
      type: PaymentTypeMother.create('CASH'),
      description: StringObject.create('Payment description'),
    });
    expect(payment).toBeTruthy();
    expect(payment.id).toBeTruthy();
    expect(payment.date).toBeInstanceOf(Date);
    expect(payment.type.getValue()).toBe('CASH');
    expect(payment.money.amount).toBe(100);
    expect(payment.description?.getValue()).toBe('Payment description');
  });
});
