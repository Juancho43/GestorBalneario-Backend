import {IUseCase} from "../../../common/Application/IUseCase";
import {GetSeasonsInvoicesDAO} from "../Interfaces/GetSeasonsInvoicesDAO";
import {InvoiceResponse} from "../DTO/InvoiceResponse";
import {GetSeasonInvoicesQuery} from "../Queries/GetSeasonInvoicesQuery";

export class GetSeasonsInvoices implements IUseCase<GetSeasonInvoicesQuery,InvoiceResponse[]> {
    constructor(private dao: GetSeasonsInvoicesDAO) {
    }
    async execute(request: GetSeasonInvoicesQuery): Promise<InvoiceResponse[]> {
        return await this.dao.get(request)
    }
}