import {Inject, Injectable, Logger} from '@nestjs/common';
import {DeleteClient} from "../../../../core/Client/Application/UseCase/DeleteClient";
import type {DeleteClientDAO} from "../../../../core/Client/Model/DAO/DeleteClientDAO";
import {DeleteClientCommand} from "../../../../core/Client/Application/Commands/DeleteClientCommand";

@Injectable()
export class DeleteClientService {
    private useCase: DeleteClient;
    private logger = new Logger(DeleteClient.name);
    constructor(@Inject('DELETE_CLIENT_INTERFACE') implementation: DeleteClientDAO) {
        this.useCase = new DeleteClient(implementation);
    }

    async execute(command: DeleteClientCommand){
        try {
            this.logger.debug('Deleting client with id:', command);
            return await this.useCase.execute(command);
        }catch (error) {
            this.logger.error('Error deleting client:', error);
            throw error;
        }
    }

}
