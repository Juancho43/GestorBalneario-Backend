import {IUseCase} from "../../common/Application/IUseCase";
import {ShadowMapDTO} from "./DTO/ShadowMapDTO";
import {ShadowMapQuery} from "./ShadowMapQuery";

export class GetShadowMap implements IUseCase<void,ShadowMapDTO>
{
    constructor(private dao: ShadowMapQuery) {
    }

    async execute(): Promise<ShadowMapDTO> {
        return await this.dao.get();
    }

}