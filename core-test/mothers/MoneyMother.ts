import { Currency, Money } from '../../core/Payment/Model/Money';

export class MoneyMother {
  static create(
    overrides: Partial<{
      amount: number;
      exchangeRate: number;
      currency: Currency;
    }> = {},
  ): Money {
    // Default: 1000 ARS con tasa 1
    const defaults = {
      amount: overrides.amount ?? 1000,
      exchangeRate: overrides.exchangeRate ?? 1,
      currency: overrides.currency ?? Currency.ARS,
    };

    return Money.create(
      defaults.amount,
      defaults.exchangeRate,
      defaults.currency,
    );
  }

  /**
   * Crea un monto en dólares con una tasa de cambio específica
   */
  static inUSD(amount: number = 100, rate: number = 1000): Money {
    return this.create({
      amount,
      exchangeRate: rate,
      currency: Currency.USD,
    });
  }
}
