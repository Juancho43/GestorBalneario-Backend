import {Inject, Injectable, Logger} from '@nestjs/common';
import {GetShadowHistory} from "../../../../core/Shadow/Application/UseCase/GetShadowHistory";
import {GetShadowHistoryQuery} from "../../../../core/Shadow/Application/Queries/GetShadowHistoryQuery";
import type {ShadowHistoryDAO} from "../../../../core/Shadow/Application/Interfaces/ShadowHistoryDAO";

@Injectable()
export class GetShadowHistoryService {
    private readonly logger = new Logger(GetShadowHistoryService.name);
    private useCase: GetShadowHistory;
    constructor(@Inject('GET_SHADOW_HISTORY') dao: ShadowHistoryDAO) {
        this.useCase = new GetShadowHistory(dao);
    }
    execute(query:GetShadowHistoryQuery){
        try{
            this.logger.debug("GetShadowHistoryService.execute", query);
            return this.useCase.execute(query);
        }catch(e){
            this.logger.error(e.message)
            throw e;
        }
    }
}
