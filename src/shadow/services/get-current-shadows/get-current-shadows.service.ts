import {Inject, Injectable} from '@nestjs/common';
import type {GetShadowListDAO} from "../../../../core/Shadow/Model/DAO/GetShadowListDAO";
import {GetCurrent} from "../../../../core/Shadow/Application/GetCurrent";
import {ShadowResponse} from "../../../../core/Shadow/Application/DTO/ShadowResponse";
import any = jasmine.any;

@Injectable()
export class GetCurrentShadowsService {
    private useCase: GetCurrent;
    constructor(@Inject('GET_ALL_SHADOW_INTERFACE') private getAllShadows: GetShadowListDAO) {
        this.useCase = new GetCurrent(getAllShadows);
    }

    async get(){
        const result = await this.useCase.execute();
        return ShadowResponse.createList(result);
    }

}