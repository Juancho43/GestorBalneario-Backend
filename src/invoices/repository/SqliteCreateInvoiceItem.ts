import {SqliteBaseClass} from "../../database/SqliteBaseClass";
import {CreateInvoiceItemDAO} from "../../../core/Invoice/Model/DAO/CreateInvoiceItemDAO";
import {Injectable} from "@nestjs/common";
import {InvoiceItem} from "../../../core/Invoice/Model/InvoiceItem";
@Injectable()
export class SqliteCreateInvoiceItem extends SqliteBaseClass implements CreateInvoiceItemDAO{
    create(item: InvoiceItem): Promise<void> {
        return Promise.resolve(undefined);
    }

}