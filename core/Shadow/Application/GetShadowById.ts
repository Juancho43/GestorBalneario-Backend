import {GetShadowByIdQuery} from "./DTO/GetShadowByIdQuery";
import {Shadow} from "../Model/Shadow";
import {IUseCase} from "../../common/Application/IUseCase";

import {GetShadow} from "../Model/GetShadow";
export class GetShadowById implements IUseCase<GetShadowByIdQuery, Shadow>{
    constructor(private readonly get: GetShadow) {
    }
    async execute(request: GetShadowByIdQuery): Promise<Shadow> {
        const shadow = await this.get.get(request.shadowId);
        if (!shadow){
            throw new Error("Shadow not found");
        }
        return shadow;
    }
}