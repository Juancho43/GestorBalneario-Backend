import {Inject, Injectable, Logger} from '@nestjs/common';
import {ServiceResponse} from "../../../../core/Service/Application/DTO/ServiceResponse";
import {ServiceSearchQuery} from "../../../../core/Service/Application/Queries/ServiceSearchQuery";
import {ServiceSearch} from "../../../../core/Service/Application/UseCase/ServiceSearch";
import {SERVICE_TOKEN} from "../../SERVICE_TOKEN";

@Injectable()
export class ServiceSearcherService {

    private logger = new Logger(ServiceSearcherService.name);

    constructor(
        @Inject(SERVICE_TOKEN.USECASE.SEARCHER) private useCase: ServiceSearch,
    ) {}

    execute(query:ServiceSearchQuery): Promise<ServiceResponse[]> {
        try {
            this.logger.debug('Executing ServiceSearcherService', query);
            return this.useCase.execute(query);
        } catch (error) {
            this.logger.error(error);
            throw error;
        }
    }
}
