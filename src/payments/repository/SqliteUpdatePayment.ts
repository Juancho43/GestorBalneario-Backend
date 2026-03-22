import {CreatePaymentDAO} from "../../../core/Payment/Model/DAO/CreatePaymentDAO";
import {Inject, Injectable} from "@nestjs/common";
import {DB_PROVIDER} from "../../database/DBPROVIDER";
import { Payment } from "core/Payment/Model/Payment";
import {UpdatePaymentDAO} from "../../../core/Payment/Model/DAO/UpdatePaymentDAO";

@Injectable()
export class SqliteUpdatePayment implements UpdatePaymentDAO {

    constructor(@Inject(DB_PROVIDER) private readonly db: any) {
    }

    save(payment: Payment): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}