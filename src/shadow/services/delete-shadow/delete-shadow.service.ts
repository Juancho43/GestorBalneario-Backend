import {Inject, Injectable} from '@nestjs/common';
import {DeleteShadow} from "../../../../core/Shadow/Application/DeleteShadow";
import {DeleteShadowCommand} from "../../../../core/Shadow/Application/DTO/DeleteShadowCommand";
import type {DeleteShadowById} from "../../../../core/Shadow/Model/DeleteShadowById";

@Injectable()
export class DeleteShadowService {
    private useCase: DeleteShadow;

    constructor(@Inject('DELETE_SHADOW_INTERFACE') implementation: DeleteShadowById) {
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
