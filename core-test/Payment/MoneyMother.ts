import {Currency, Money} from "../../core/Payment/Model/Money";

export class MoneyMother {
    static create(amount:number = 1, change:number = 1, currency:Currency = Currency.ARS) {
        return Money.create(amount, change, currency);
    }
}