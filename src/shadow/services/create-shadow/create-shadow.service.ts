import {Inject, Injectable} from '@nestjs/common';
import {CreateShadow} from "../../../../core/Shadow/Application/CreateShadow";
import type {PersistShadow} from "../../../../core/Shadow/Model/PersistShadow";
import {CreateShadowCommand} from "../../../../core/Shadow/Application/DTO/CreateShadowCommand";

@Injectable()
export class CreateShadowService {
    private useCase: CreateShadow;

    constructor(@Inject('PERSIST_SHADOW_INTERFACE') implementation: PersistShadow) {
        this.useCase = new CreateShadow(implementation);
    }

    async execute(command: CreateShadowCommand) {
        try {
            return await this.useCase.execute(command);
        }catch (error) {
            console.error('Error creating shadow:', error);
            throw error;
        }
    }
}

