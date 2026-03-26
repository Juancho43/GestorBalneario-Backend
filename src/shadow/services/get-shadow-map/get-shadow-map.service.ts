import {Inject, Injectable, Logger} from '@nestjs/common';
import {GetShadowMap} from "../../../../core/Shadow/Application/GetShadowMap";
import type {ShadowMapDAO} from "../../../../core/Shadow/Application/ShadowMapDAO";

@Injectable()
export class GetShadowMapService {
    private useCase: GetShadowMap;
    private logger = new Logger(GetShadowMapService.name);

    constructor(@Inject('GET_SHADOW_MAP') private dao: ShadowMapDAO) {
        this.useCase = new GetShadowMap(this.dao);
    }

    async execute(){
        try{
            const result = await this.useCase.execute();
            this.logger.log('Executing GetShadowMapService', result);
            return result;
        }catch(error){
            this.logger.error(error.message);
            return error;
        }
    }
}

