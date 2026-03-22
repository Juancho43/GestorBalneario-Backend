import {CreatePaymentDAO} from "../../../core/Payment/Model/DAO/CreatePaymentDAO";
import {Injectable} from "@nestjs/common";
import { Payment } from "core/Payment/Model/Payment";
import {SqliteBaseClass} from "../../database/SqliteBaseClass";

@Injectable()
export class SqliteCreatePayment extends SqliteBaseClass implements CreatePaymentDAO {

    async save(payment: Payment): Promise<void> {
        const insertPaymentSql = `
            Insert into Payments(id, date, type, amount, changeType, finalAmount, description, created_at, updated_at)
            VALUES (@id, @date, @type, @amount, @changeType, @finalAmount, @description, @createdAt, @updatedAt);
        `
        const insertRelationSql = `
            insert into Reservation_Payments(id, reservationId, paymentId)
            values (@id, @reservationId, @paymentId)
        `;

        console.log("Inserting payment: ", payment);
        const paymentResult = this.getDb().prepare(insertPaymentSql).run({
            id:payment.id.value,
            date:  payment.date.toISOString(),
            type: payment.type.toString(),
            amount: payment.money.amount,
            changeType: payment.money.exchangeRate,
            finalAmount: payment.finalAmount,
            description: payment.description?.getValue(),
            createdAt: payment.timestamp.createdAt.toISOString(),
            updatedAt: payment.timestamp.updatedAt.toISOString(),
        });

        console.log("Payment inserted with id: ", paymentResult);
    }

}