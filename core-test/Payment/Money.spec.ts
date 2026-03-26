import {expect} from "vitest";
import {MoneyMother} from "./MoneyMother";

describe('Money Domain Entity',() =>{
    it('should be created', () =>{
        const money  = MoneyMother.create(100, 1, 'USD');
        expect(money).toBeTruthy();
        expect(money.amount).toBe(100);
        expect(money.currency).toBe('USD');
        expect(money.exchangeRate).toBe(1);
    })

    it('should calculate final amount', () => {
        const money  = MoneyMother.create(100, 1140, 'USD');
        expect(money.finalAmount).toBe(100 * 1140);
    })

    it('should trow exceptions if number is negative', ()=>{
        expect(()=>MoneyMother.create(-100)).toThrowError(Error);
    })
})