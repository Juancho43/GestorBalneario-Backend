import {Inject, Injectable, Logger} from '@nestjs/common';
import {SeasonResponse} from "../../../../core/Season/Application/DTO/SeasonResponse";
import type {GetSeasonsDAO} from "../../../../core/Season/Model/DAO/GetSeasonsDAO";
import {GetSeasons} from "../../../../core/Season/Application/GetSeasons";

@Injectable()
export class GetSeasonsService {
    private readonly logger = new Logger(GetSeasonsService.name);
    private useCase : GetSeasons;

    constructor(
        @Inject('GET_SEASONS') dao:GetSeasonsDAO
    ) {
        this.useCase = new GetSeasons(dao);
    }

    async execute(){
        try{
            this.logger.debug('Getting seasons');
            return SeasonResponse.createList(await this.useCase.execute());
        }catch(error){
            this.logger.error(error);
            return error;
        }
    }
}
