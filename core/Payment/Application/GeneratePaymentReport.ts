import {IUseCase} from "../../common/Application/IUseCase";
import {PaymentsReportQuery} from "./Query/PaymentsReportQuery";
import {PaymentsReportDTO} from "./DTO/PaymentsReportDTO";
import {PaymentsReportDAO} from "./PaymentsReportDAO";

export class GeneratePaymentReport implements IUseCase<PaymentsReportQuery, PaymentsReportDTO> {
    constructor(private dao: PaymentsReportDAO) {
    }
   async execute(request: PaymentsReportQuery): Promise<PaymentsReportDTO> {
        return await this.dao.get(request);
    }
}