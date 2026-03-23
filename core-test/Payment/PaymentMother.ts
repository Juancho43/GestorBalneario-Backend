import {Payment} from "../../core/Payment/Model/Payment";
import {UUID} from "../../core/common/Model/UUID";
import {PaymentType} from "../../core/Payment/Model/PaymentType";
import {StringObject} from "../../core/common/Model/StringObject";
import {Money} from "../../core/Payment/Model/Money";

export class PaymentMother {
    static create(id:UUID, date: Date, type: PaymentType, money: Money, description: StringObject, timestamp, softdelete): Payment {
       return Payment.create(
           id,
           date,
           type,
           money,
           description,
           timestamp,
           softdelete
       )
    }
}