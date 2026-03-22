import {Inject, Injectable} from '@nestjs/common';
import {UpdateShadow} from "../../../../core/Shadow/Application/UpdateShadow";
import {UpdateShadowCommand} from "../../../../core/Shadow/Application/DTO/UpdateShadowCommand";
import {ShadowResponse} from "../../../../core/Shadow/Application/DTO/ShadowResponse";
import type {UpdateShadowDAO} from "../../../../core/Shadow/Model/DAO/UpdateShadowDAO";

@Injectable()
export class EditShadowService {

    private useCase: UpdateShadow;

    constructor(@Inject('UPDATE_SHADOW_INTERFACE') create: UpdateShadowDAO) {
        this.useCase = new UpdateShadow(create);
    }

    async execute(command: UpdateShadowCommand){
        try {
            return ShadowResponse.create(await this.useCase.execute(command));
        }catch (error) {
            console.error('Error updating shadow:', error);
            throw error;
        }
    }
}
