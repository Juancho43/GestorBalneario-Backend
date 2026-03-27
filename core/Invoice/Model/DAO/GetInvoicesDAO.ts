import {Invoice} from "../Invoice";

export interface GetInvoicesDAO {
    get(): Promise<Invoice[]>;
}