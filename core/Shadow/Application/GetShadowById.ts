import {GetShadowByIdQuery} from "./DTO/GetShadowByIdQuery";
import {Shadow} from "../Model/Shadow";
import {IUseCase} from "../../common/Application/IUseCase";

import {GetShadowDAO} from "../Model/DAO/GetShadowDAO";
export class GetShadowById implements IUseCase<GetShadowByIdQuery, Shadow>{
    constructor(private readonly get: GetShadowDAO) {
    }
    async execute(request: GetShadowByIdQuery): Promise<Shadow> {
        const shadow = await this.get.get(request.shadowId);
        if (!shadow){
            throw new Error("Shadow not found");
        }
        return shadow;
    }
}