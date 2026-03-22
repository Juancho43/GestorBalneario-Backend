import {Inject, Injectable} from '@nestjs/common';
import {CreateShadow} from "../../../../core/Shadow/Application/CreateShadow";
import {CreateShadowCommand} from "../../../../core/Shadow/Application/DTO/CreateShadowCommand";
import {ShadowResponse} from "../../../../core/Shadow/Application/DTO/ShadowResponse";
import type {CreateShadowDAO} from "../../../../core/Shadow/Model/DAO/CreateShadowDAO";

@Injectable()
export class CreateShadowService {
    private useCase: CreateShadow;

    constructor(@Inject('CREATE_SHADOW_INTERFACE') implementation: CreateShadowDAO) {
        this.useCase = new CreateShadow(implementation);
    }

    async execute(command: CreateShadowCommand) {
        try {
            return ShadowResponse.create(await this.useCase.execute(command));
        }catch (error) {
            console.error('Error creating shadow:', error);
            throw error;
        }
    }
}

