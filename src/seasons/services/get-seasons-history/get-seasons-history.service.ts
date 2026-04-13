import {Inject, Injectable, Logger} from '@nestjs/common';
import {GetSeasonHistory} from "../../../../core/Season/Application/UseCase/GetSeasonHistory";
import type {GetSeasonsDAO} from "../../../../core/Season/Model/DAO/GetSeasonsDAO";
import {SeasonResponse} from "../../../../core/Season/Application/DTO/SeasonResponse";
import {GetSeasonsHistoryQuery} from "../../../../core/Season/Application/Queries/GetSeasonsHistoryQuery";

@Injectable()
export class GetSeasonsHistoryService {
    private logger = new Logger(GetSeasonsHistoryService.name);
    private useCase : GetSeasonHistory ;

    constructor(
        @Inject('GET_HISTORY') dao: GetSeasonsDAO
    ){
        this.useCase = new GetSeasonHistory(dao);
    }

    async execute(query:GetSeasonsHistoryQuery){
        try{
            this.logger.debug('Executing GetSeasonsHistoryService');
            return SeasonResponse.createList(await this.useCase.execute(query));
        } catch(error) {
            this.logger.error(error);
            throw error;
        }
    }
}