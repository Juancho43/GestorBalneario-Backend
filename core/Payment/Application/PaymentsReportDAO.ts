import {PaymentsReportDTO} from "./DTO/PaymentsReportDTO";
import {PaymentsReportQuery} from "./Query/PaymentsReportQuery";

export interface PaymentsReportDAO {
    get(query: PaymentsReportQuery): Promise<PaymentsReportDTO>;
}