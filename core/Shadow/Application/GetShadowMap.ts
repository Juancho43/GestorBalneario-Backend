import {IUseCase} from "../../common/Application/IUseCase";
import {ShadowMapDTO} from "./DTO/ShadowMapDTO";
import {ShadowMapDAO} from "./ShadowMapDAO";

export class GetShadowMap implements IUseCase<void,ShadowMapDTO>
{
    constructor(private dao: ShadowMapDAO) {
    }

    async execute(): Promise<ShadowMapDTO> {
        return await this.dao.get();
    }

}