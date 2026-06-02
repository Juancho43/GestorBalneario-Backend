import {Inject, Injectable, Logger} from '@nestjs/common';
import {InvoiceSearch} from "../../../../core/Invoice/Application/UseCase/InvoiceSearch";
import {INVOICE_TOKEN} from "../../INVOICE_TOKEN";
import {InvoiceSearchQuery} from "../../../../core/Invoice/Application/Queries/InvoiceSearchQuery";
import {InvoiceResponse} from "../../../../core/Invoice/Application/DTO/InvoiceResponse";

@Injectable()
export class InvoicesSearcherService {

    private logger = new Logger(InvoicesSearcherService.name);

    constructor(
        @Inject(INVOICE_TOKEN.USECASE.SEARCHER) private useCase: InvoiceSearch,
    ) {}

    execute(query: InvoiceSearchQuery): Promise<InvoiceResponse[]> {
        try {
            this.logger.debug('Executing InvoicesSearcherService', query);
            return this.useCase.execute(query);
        } catch (error) {
            this.logger.error(error);
            throw error;
        }
    }
}
