import {Inject, Injectable, Logger} from '@nestjs/common';
import {SeasonDetails} from "../../../../core/Season/Application/UseCase/SeasonDetails";
import {SEASON_TOKEN} from "../../SEASON_TOKEN";
import {GetByIdQuery} from "../../../../core/common/Application/GetByIdQuery";

@Injectable()
export class GetSeasonDetailsService {
    private logger = new Logger(GetSeasonDetailsService.name);

    constructor(@Inject(SEASON_TOKEN.USECASE.GET_DETAILS)private useCase : SeasonDetails){}

    execute(id: GetByIdQuery){
        try{
            this.logger.debug('Executing GetSeasonDetailsService',id);
            return this.useCase.execute(id)
        } catch(error) {
            this.logger.error(error);
            throw error;
        }
    }
}
