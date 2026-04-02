import {Inject, Injectable, Logger} from '@nestjs/common';
import {CreateShadow} from "../../../../core/Shadow/Application/UseCase/CreateShadow";
import {CreateShadowCommand} from "../../../../core/Shadow/Application/Command/CreateShadowCommand";
import {ShadowResponse} from "../../../../core/Shadow/Application/Response/ShadowResponse";
import type {CreateShadowDAO} from "../../../../core/Shadow/Model/DAO/CreateShadowDAO";
import {GetActiveSeasonService} from "../../../seasons/services/get-active-season/get-active-season.service";

@Injectable()
export class CreateShadowService {
    private logger = new Logger(CreateShadowService.name);
    private useCase: CreateShadow;
    constructor(
        @Inject('CREATE_SHADOW_INTERFACE') implementation: CreateShadowDAO,
        @Inject() season:GetActiveSeasonService
    ) {
        this.useCase = new CreateShadow(implementation,season);
    }

    async execute(command: CreateShadowCommand) {
        try {
            this.logger.debug('Creating a shadow',command);
            return ShadowResponse.create(await this.useCase.execute(command));
        }catch (error) {
            this.logger.error('Error creating shadow:', error);
            throw error;
        }
    }
}

