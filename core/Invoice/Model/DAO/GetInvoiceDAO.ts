import {Invoice} from "../Invoice";

export interface GetInvoiceDAO{
    get(id:string):Promise<Invoice | null>
}