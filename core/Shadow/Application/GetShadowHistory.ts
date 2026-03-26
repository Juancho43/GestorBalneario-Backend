import {IUseCase} from "../../common/Application/IUseCase";
import {ShadowHistoryDTO} from "./DTO/ShadowHistoryDTO";
import {ShadowHistoryDAO} from "./ShadowHistoryDAO";
import {GetShadowHistoryQuery} from "./DTO/GetShadowHistoryQuery";

export class GetShadowHistory implements IUseCase<GetShadowHistoryQuery, ShadowHistoryDTO>{
    constructor(private dao: ShadowHistoryDAO) {
    }
    async execute(request: GetShadowHistoryQuery): Promise<ShadowHistoryDTO> {
        return await this.dao.get(request.id,request.page,request.pageSize);
    }
}