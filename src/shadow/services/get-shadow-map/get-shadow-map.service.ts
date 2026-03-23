import {Inject, Injectable} from '@nestjs/common';
import {GetShadowMap} from "../../../../core/Shadow/Application/GetShadowMap";
import type {ShadowMapQuery} from "../../../../core/Shadow/Application/ShadowMapQuery";

@Injectable()
export class GetShadowMapService {
    private useCase: GetShadowMap;


    constructor(@Inject('GET_SHADOW_MAP') private dao: ShadowMapQuery) {
        this.useCase = new GetShadowMap(this.dao);
    }

    async execute(){
        return await this.useCase.execute();
    }
}

