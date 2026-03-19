import {Inject, Injectable} from '@nestjs/common';
import type {SaveClientDAO} from "../../../../core/Client/Model/DAO/SaveClientDAO";
import {CreateClientCommand} from "../../../../core/Client/Application/DTO/CreateClientCommand";
import {ClientResponse} from "../../../../core/Client/Application/DTO/ClientResponse";
import {CreateClient} from "../../../../core/Client/Application/CreateClient";

@Injectable()
export class CreateClientService {
    private useCase: CreateClient;

    constructor(@Inject('CREATE_CLIENT_INTERFACE') implementation: SaveClientDAO) {
        this.useCase = new CreateClient(implementation);
    }

    async execute(command: CreateClientCommand) {
        try {
            return ClientResponse.create(await this.useCase.execute(command));
        }catch (error) {
            throw error;
        }
    }
}

