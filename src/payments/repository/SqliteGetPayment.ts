import {CreatePaymentDAO} from "../../../core/Payment/Model/DAO/CreatePaymentDAO";
import {Inject, Injectable} from "@nestjs/common";
import {DB_PROVIDER} from "../../database/DBPROVIDER";
import { Payment } from "core/Payment/Model/Payment";
import {UpdatePaymentDAO} from "../../../core/Payment/Model/DAO/UpdatePaymentDAO";
import {GetPaymentDAO} from "../../../core/Payment/Model/DAO/GetPaymentDAO";

@Injectable()
export class SqliteGetPayment implements GetPaymentDAO {

    constructor(@Inject(DB_PROVIDER) private readonly db: any) {
    }
    get(id: string): Promise<Payment | null> {
        throw new Error("Method not implemented.");
    }
}