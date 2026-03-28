import {IUseCase} from "../../common/Application/IUseCase";
import {ShadowMapDTO} from "./Response/ShadowMapDTO";
import {ShadowMapDAO} from "./Query/ShadowMapDAO";

export class GetShadowMap implements IUseCase<void,ShadowMapDTO>
{
    constructor(private dao: ShadowMapDAO) {
    }

    async execute(): Promise<ShadowMapDTO> {
        return await this.dao.get();
    }

}