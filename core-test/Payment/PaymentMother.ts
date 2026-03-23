import {Payment} from "../../core/Payment/Model/Payment";
import {UniqueIdentifier} from "../../core/common/Model/UniqueIdentifier";
import {PaymentType} from "../../core/Payment/Model/PaymentType";
import {StringObject} from "../../core/common/Model/StringObject";
import {Money} from "../../core/Payment/Model/Money";

export class PaymentMother {
    static create(id:UniqueIdentifier,date: Date, type: PaymentType, money: Money, description: StringObject, timestamp, softdelete): Payment {
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