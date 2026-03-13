import {Inject, Injectable} from '@nestjs/common';
import {GetClientById} from "../../../../core/Client/Application/GetClientById";
import type {GetClientDAO} from "../../../../core/Client/Model/DAO/GetClientDAO";
import {GetClientQuery} from "../../../../core/Client/Application/DTO/GetClientQuery";
import {ClientResponse} from "../../../../core/Client/Application/DTO/ClientResponse";

@Injectable()
export class GetClientService {

    private useCase: GetClientById;

    constructor(@Inject('GET_CLIENT_INTERFACE') implementation: GetClientDAO) {
        this.useCase = new GetClientById(implementation);
    }

    async execute(query: GetClientQuery){
        try {
            return ClientResponse.create(await this.useCase.execute(query));
        }catch (error) {
            console.error('Error getting shadow:', error);
            throw error;
        }
    }
}
