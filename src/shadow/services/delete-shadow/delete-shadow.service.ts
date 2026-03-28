import {Inject, Injectable} from '@nestjs/common';
import {DeleteShadow} from "../../../../core/Shadow/Application/DeleteShadow";
import {DeleteShadowCommand} from "../../../../core/Shadow/Application/Command/DeleteShadowCommand";
import type {DeleteShadowDAO} from "../../../../core/Shadow/Model/DAO/DeleteShadowDAO";

@Injectable()
export class DeleteShadowService {
    private useCase: DeleteShadow;

    constructor(@Inject('DELETE_SHADOW_INTERFACE') implementation: DeleteShadowDAO) {
        this.useCase = new DeleteShadow(implementation);
    }

    async execute(command: DeleteShadowCommand){
        try {
            return await this.useCase.execute(command);
        }catch (error) {
            console.error('Error deleting shadow:', error);
            throw error;
        }
    }
}
