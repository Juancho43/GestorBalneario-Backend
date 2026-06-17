import {expect} from 'vitest';
import {MoneyMother} from '../mothers/MoneyMother';
import {Currency} from '../../core/Payment/Model/Money';

describe('Money Domain Entity', () => {
  it('should be created', () => {
    const money = MoneyMother.create({
      amount: 100,
      exchangeRate: 1,
      currency: Currency.USD,
    });
    expect(money).toBeTruthy();
    expect(money.amount).toBe(100);
    expect(money.currency).toBe('USD');
    expect(money.exchangeRate).toBe(1);
  });

  it('should calculate final amount', () => {
    const money = MoneyMother.create({
      amount: 100,
      exchangeRate: 1140,
      currency: Currency.USD,
    });
    expect(money.finalAmount).toBe(100 * 1140);
  });

});
