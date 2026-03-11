import {Inject, Injectable} from '@nestjs/common';
import type {PersistShadow} from "../../../../core/Shadow/Model/PersistShadow";
import {UpdateShadow} from "../../../../core/Shadow/Application/UpdateShadow";
import {UpdateShadowCommand} from "../../../../core/Shadow/Application/DTO/UpdateShadowCommand";

@Injectable()
export class EditShadowService {

    private useCase: UpdateShadow;

    constructor(@Inject('PERSIST_SHADOW_INTERFACE') create: PersistShadow) {
        this.useCase = new UpdateShadow(create);
    }

    async execute(command: UpdateShadowCommand){
        try {
            return await this.useCase.execute(command);
        }catch (error) {
            console.error('Error updating shadow:', error);
            throw error;
        }
    }
}
