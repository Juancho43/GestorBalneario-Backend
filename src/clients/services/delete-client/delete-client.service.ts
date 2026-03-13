import {Inject, Injectable} from '@nestjs/common';
import {DeleteClient} from "../../../../core/Client/Application/DeleteClient";
import type {DeleteClientDAO} from "../../../../core/Client/Model/DAO/DeleteClientDAO";
import {DeleteClientCommand} from "../../../../core/Client/Application/DTO/DeleteClientCommand";

@Injectable()
export class DeleteClientService {
    private useCase: DeleteClient;

    constructor(@Inject('DELETE_CLIENT_INTERFACE') implementation: DeleteClientDAO) {
        this.useCase = new DeleteClient(implementation);
    }

    async execute(command: DeleteClientCommand){
        try {
            return await this.useCase.execute(command);
        }catch (error) {
            console.error('Error deleting client:', error);
            throw error;
        }
    }

}
