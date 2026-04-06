import {Inject, Injectable, Logger} from '@nestjs/common';
import {ClientResponse} from "../../../../core/Client/Application/DTO/ClientResponse";
import type {GetClientsDAO} from "../../../../core/Client/Model/DAO/GetClientsDAO";
import {GetClients} from "../../../../core/Client/Application/UseCase/GetClients";
import {GetClientsQuery} from "../../../../core/Client/Application/Queries/GetClientsQuery";

@Injectable()
export class GetClientsService {
    private useCase: GetClients;
    private logger = new Logger(GetClientsService.name);
    constructor(@Inject('GET_CLIENTS_INTERFACE') implementation: GetClientsDAO) {
        this.useCase = new GetClients(implementation);
    }

    async execute(query: GetClientsQuery){
        try {
            this.logger.debug('Getting clients with query: ', query);
            return ClientResponse.createList(await this.useCase.execute(query));
        }catch (error) {
            this.logger.error('Error getting clients:', error);
            throw error;
        }
    }

}
