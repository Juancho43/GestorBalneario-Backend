import {CreatePaymentDAO} from "../../../core/Payment/Model/DAO/CreatePaymentDAO";
import {Injectable} from "@nestjs/common";
import { Payment } from "core/Payment/Model/Payment";
import {SqliteBaseClass} from "../../database/SqliteBaseClass";
import {UUID} from "../../../core/common/Model/UUID";
import {Invoice} from "../../../core/Invoice/Model/Invoice";

@Injectable()
export class SqliteCreatePayment extends SqliteBaseClass implements CreatePaymentDAO {

    async save(payment: Payment, invoice: Invoice): Promise<void> {
        const insertPaymentSql = `
            Insert into Payments(id, date, type, amount, changeType, finalAmount, description, created_at, updated_at)
            VALUES (@id, @date, @type, @amount, @changeType, @finalAmount, @description, @createdAt, @updatedAt);
        `
        const insertRelationSql = `
            insert into Invoice_Payments(id, invoiceId, paymentId)
            values (@id, @invoiceId, @paymentId)
        `;
       const stmtPayment = this.getDb().prepare(insertPaymentSql);
       const stmtRelation = this.getDb().prepare(insertRelationSql);

       const transaction = this.getDb().transaction(()=>{

           stmtPayment.run({
               id:payment.id.value,
               date:  payment.date.toISOString(),
               type: payment.type.toString(),
               amount: payment.money.amount,
               changeType: payment.money.exchangeRate,
               finalAmount: payment.finalAmount,
               description: payment.description?.getValue(),
               createdAt: payment.timestamp.createdAt.toISOString(),
               updatedAt: payment.timestamp.updatedAt.toISOString(),
           })
           stmtRelation.run({
               id: UUID.create().value,
               invoiceId: invoice.id.value,
               paymentId: payment.id.value,
           })
       })

       transaction();
    }

}