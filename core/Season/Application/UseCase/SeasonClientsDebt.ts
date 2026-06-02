import {GetSeasonQuery} from "../Queries/GetSeasonQuery";
import {IUseCase} from "../../../common/Application/IUseCase";
import {SeasonClientsDebtDAO} from "../Interfaces/SeasonClientsDebtDAO";

export class SeasonClientsDebt implements IUseCase<GetSeasonQuery,number>{

    constructor(private dao: SeasonClientsDebtDAO) {
    }

    async execute(request: GetSeasonQuery): Promise<number> {
        const invoices = await this.dao.get(request);
        return invoices.reduce((total, invoice) => total + invoice.calculateDebt(), 0);
    }
}