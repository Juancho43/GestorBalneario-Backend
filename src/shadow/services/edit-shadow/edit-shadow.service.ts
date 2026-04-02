import {Inject, Injectable, Logger} from '@nestjs/common';
import {UpdateShadow} from "../../../../core/Shadow/Application/UseCase/UpdateShadow";
import {UpdateShadowCommand} from "../../../../core/Shadow/Application/Command/UpdateShadowCommand";
import {ShadowResponse} from "../../../../core/Shadow/Application/Response/ShadowResponse";
import type {UpdateShadowDAO} from "../../../../core/Shadow/Model/DAO/UpdateShadowDAO";
import {GetActiveSeasonService} from "../../../seasons/services/get-active-season/get-active-season.service";

@Injectable()
export class EditShadowService {

    private useCase: UpdateShadow;
    private logger = new Logger(EditShadowService.name);
    constructor(@Inject('UPDATE_SHADOW_INTERFACE') create: UpdateShadowDAO,
            @Inject()season: GetActiveSeasonService
    ) {
        this.useCase = new UpdateShadow(create,season);
    }

    async execute(command: UpdateShadowCommand){
        try {
            this.logger.debug('Updating shadow',command)
            return ShadowResponse.create(await this.useCase.execute(command));
        }catch (error) {
            this.logger.error('Error updating shadow:', error);
            throw error;
        }
    }
}
