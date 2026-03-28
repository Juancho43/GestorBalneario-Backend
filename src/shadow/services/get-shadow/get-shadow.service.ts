import {Inject, Injectable} from '@nestjs/common';
import type {GetShadowDAO} from "../../../../core/Shadow/Model/DAO/GetShadowDAO";
import {GetShadowById} from "../../../../core/Shadow/Application/GetShadowById";
import {GetShadowByIdQuery} from "../../../../core/Shadow/Application/DTO/GetShadowByIdQuery";
import {ShadowResponse} from "../../../../core/Shadow/Application/Response/ShadowResponse";

@Injectable()
export class GetShadowService {
    private useCase: GetShadowById;

    constructor(@Inject('GET_SHADOW_INTERFACE') implementation: GetShadowDAO) {
        this.useCase = new GetShadowById(implementation);
    }

    async execute(command: GetShadowByIdQuery){
        try {
            return ShadowResponse.create(await this.useCase.execute(command));
        }catch (error) {
            console.error('Error getting shadow:', error);
            throw error;
        }
    }
}
