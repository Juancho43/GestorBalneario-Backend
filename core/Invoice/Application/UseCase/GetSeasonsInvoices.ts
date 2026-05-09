import {IUseCase} from "../../../common/Application/IUseCase";
import {GetSeasonEntityQuery} from "../../../Service/Application/Queries/GetSeasonEntityQuery";
import {GetSeasonsInvoicesDAO} from "../Interfaces/GetSeasonsInvoicesDAO";
import {InvoiceResponse} from "../DTO/InvoiceResponse";

export class GetSeasonsInvoices implements IUseCase<GetSeasonEntityQuery,InvoiceResponse[]> {
    constructor(private dao: GetSeasonsInvoicesDAO) {
    }
    async execute(request: GetSeasonEntityQuery): Promise<InvoiceResponse[]> {
        return await this.dao.get(request)
    }
}