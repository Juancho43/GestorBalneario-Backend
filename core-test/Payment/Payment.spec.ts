import {PaymentMother} from "./PaymentMother";
import {UniqueIdentifier} from "../../core/common/Model/UniqueIdentifier";
import {PaymentType} from "../../core/Payment/Model/PaymentType";
import {MoneyMother} from "./MoneyMother";
import {StringObject} from "../../core/common/Model/StringObject";
import {Timestamps} from "../../core/common/Model/Timestamps";
import {SoftDelete} from "../../core/common/Model/SoftDelete";

describe("Payment Domain Entity", () => {
    it('should be created', () => {
        const payment = PaymentMother.create(
            UniqueIdentifier.create(),
            new Date(),
            PaymentType.create('CASH'),
            MoneyMother.create(100),
            StringObject.create('Payment description'),
            Timestamps.create(),
            SoftDelete.empty(),
            )
        expect(payment).toBeTruthy();
        expect(payment.id).toBeTruthy();
        expect(payment.date).toBeInstanceOf(Date);
        expect(payment.type.getValue()).toBe('CASH');
        expect(payment.money.amount).toBe(100);
        expect(payment.description?.getValue()).toBe('Payment description');
    })

})