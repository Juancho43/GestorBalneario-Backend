import {Inject, Injectable, Logger} from '@nestjs/common';
import {GetSeason} from "../../../../core/Season/Application/GetSeason";
import type {GetSeasonDAO} from "../../../../core/Season/Model/DAO/GetSeasonDAO";
import {GetSeasonQuery} from "../../../../core/Season/Application/DTO/GetSeasonQuery";
import {SeasonResponse} from "../../../../core/Season/Application/DTO/SeasonResponse";

@Injectable()
export class GetSeasonService {
    private readonly logger = new Logger(GetSeasonService.name);
    private useCase : GetSeason;

    constructor(
        @Inject('GET_SEASON') dao:GetSeasonDAO
    ) {
        this.useCase = new GetSeason(dao);
    }

    async execute(command: GetSeasonQuery){
        try{
            this.logger.debug('Getting a season', command);
            return SeasonResponse.create(await this.useCase.execute(command));
        }catch(error){
            this.logger.error(error);
            return error;
        }
    }
}
