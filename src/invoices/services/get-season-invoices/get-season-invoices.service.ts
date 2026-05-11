import {Inject, Injectable, Logger} from '@nestjs/common';
import {INVOICE_TOKEN} from "../../INVOICE_TOKEN";
import {GetSeasonsInvoices} from "../../../../core/Invoice/Application/UseCase/GetSeasonsInvoices";
import {GetSeasonEntityQuery} from "../../../../core/Service/Application/Queries/GetSeasonEntityQuery";
import {GetSeasonInvoicesQuery} from "../../../../core/Invoice/Application/Queries/GetSeasonInvoicesQuery";

@Injectable()
export class GetSeasonInvoicesService {

    private logger = new Logger(GetSeasonInvoicesService.name);

    constructor(
        @Inject(INVOICE_TOKEN.USECASE.INVOICE_LIST)
        private useCase: GetSeasonsInvoices,
    ) {}

    execute(query: GetSeasonInvoicesQuery) {
        try {
            this.logger.debug('GetSeasonInvoicesService:', query);
            return this.useCase.execute(query);
        } catch (e) {
            this.logger.error(e);
            throw e;
        }
    }
}
