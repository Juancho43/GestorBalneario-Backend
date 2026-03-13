import {Inject, Injectable} from '@nestjs/common';
import {ClientResponse} from "../../../../core/Client/Application/DTO/ClientResponse";
import {UpdateClient} from "../../../../core/Client/Application/UpdateClient";
import type {UpdateClientDAO} from "../../../../core/Client/Model/DAO/UpdateClientDAO";
import {UpdateClientCommand} from "../../../../core/Client/Application/DTO/UpdateClientCommand";

@Injectable()
export class EditClientService {
    private useCase: UpdateClient;

    constructor(@Inject('UPDATE_CLIENT_INTERFACE') implementation: UpdateClientDAO) {
        this.useCase = new UpdateClient(implementation);
    }

    async execute(command: UpdateClientCommand) {
        try {
            return ClientResponse.create(await this.useCase.execute(command));
        }catch (error) {
            console.error('Error creating client:', error);
            throw error;
        }
    }
}
