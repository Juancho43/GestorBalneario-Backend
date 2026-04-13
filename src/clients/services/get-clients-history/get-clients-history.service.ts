import {Inject, Injectable, Logger} from '@nestjs/common';
import {PaginatedQuery} from "../../../../core/common/Application/PaginatedQuery";
import {ClientResponse} from "../../../../core/Client/Application/DTO/ClientResponse";
import {GetClientsHistory} from "../../../../core/Client/Application/UseCase/GetClientsHistory";
import type {GetClientsDAO} from "../../../../core/Client/Model/DAO/GetClientsDAO";

@Injectable()
export class GetClientsHistoryService {
    private logger = new Logger(GetClientsHistoryService.name);
    private useCase : GetClientsHistory;

    constructor(@Inject('GET_CLIENTS') dao: GetClientsDAO){
        this.useCase = new GetClientsHistory(dao);
    }

    async execute(query: PaginatedQuery): Promise<ClientResponse[]>  {
        try{
            this.logger.debug('Executing GetClientsHistoryService');
            return ClientResponse.createList(await this.useCase.execute(query));
        } catch(error) {
            this.logger.error(error);
            throw error;
        }
    }
}
