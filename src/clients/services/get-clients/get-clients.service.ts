import {Inject, Injectable} from '@nestjs/common';
import {ClientResponse} from "../../../../core/Client/Application/DTO/ClientResponse";
import type {GetClientsDAO} from "../../../../core/Client/Model/DAO/GetClientsDAO";
import {GetClients} from "../../../../core/Client/Application/GetClients";
import {GetClientsQuery} from "../../../../core/Client/Application/DTO/GetClientsQuery";

@Injectable()
export class GetClientsService {
    private useCase: GetClients;

    constructor(@Inject('GET_CLIENTS_INTERFACE') implementation: GetClientsDAO) {
        this.useCase = new GetClients(implementation);
    }

    async execute(query: GetClientsQuery){
        try {
            return ClientResponse.createList(await this.useCase.execute(query));
        }catch (error) {
            console.error('Error getting clients:', error);
            throw error;
        }
    }

}
