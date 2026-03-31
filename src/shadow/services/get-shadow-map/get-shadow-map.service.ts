import {Inject, Injectable, Logger} from '@nestjs/common';
import {GetShadowMap} from "../../../../core/Shadow/Application/UseCase/GetShadowMap";
import type {ShadowMapDAO} from "../../../../core/Shadow/Application/Interfaces/ShadowMapDAO";
import {GetActiveSeasonService} from "../../../seasons/services/get-active-season/get-active-season.service";

@Injectable()
export class GetShadowMapService {
    private useCase: GetShadowMap;
    private logger = new Logger(GetShadowMapService.name);

    constructor(
        @Inject() private seasons:GetActiveSeasonService,
        @Inject('GET_SHADOW_MAP') private dao: ShadowMapDAO) {

        this.useCase = new GetShadowMap(this.dao);
    }

    async execute(seasonId: string){
        try{
            let id = seasonId
            if (id =='none') {
               id = (await this.seasons.get()).id.value;
            }
            const result = await this.useCase.execute(id);
            this.logger.log('Executing GetShadowMapService', result);
            return result;
        }catch(error){
            this.logger.error(error.message);
            return error;
        }
    }
}

