import {IUseCase} from "../../common/Application/IUseCase";
import {Invoice} from "../Model/Invoice";
import {GetInvoicesDAO} from "../Model/DAO/GetInvoicesDAO";

export class GetInvoices implements IUseCase<null,Invoice[]> {
    constructor(private dao: GetInvoicesDAO){}
    async execute(request: null): Promise<Invoice[]> {
        return this.dao.get();
    }

}