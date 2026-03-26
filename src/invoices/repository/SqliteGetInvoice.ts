import {SqliteBaseClass} from "../../database/SqliteBaseClass";
import {GetInvoiceDAO} from "../../../core/Invoice/Model/DAO/GetInvoiceDAO";
import {Invoice} from "../../../core/Invoice/Model/Invoice";
import {Injectable} from "@nestjs/common";
@Injectable()
export class SqliteGetInvoice extends SqliteBaseClass implements GetInvoiceDAO{
    get(id: string): Promise<Invoice | null> {
        return Promise.resolve(null);
    }

}