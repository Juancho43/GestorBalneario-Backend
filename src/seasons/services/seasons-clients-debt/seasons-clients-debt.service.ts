import {Inject, Injectable, Logger} from '@nestjs/common';
import {SEASON_TOKEN} from "../../SEASON_TOKEN";
import {SeasonClientsDebt} from "../../../../core/Season/Application/UseCase/SeasonClientsDebt";
import {GetSeasonQuery} from "../../../../core/Season/Application/Queries/GetSeasonQuery";

@Injectable()
export class SeasonsClientsDebtService {
    private logger = new Logger(SeasonsClientsDebtService.name);

    constructor(
        @Inject(SEASON_TOKEN.USECASE.CLIENTS_DEBT)
        private useCase: SeasonClientsDebt){}

    execute(query: GetSeasonQuery){
        try{
            this.logger.debug('Executing SeasonsClientsDebtService', query);
            return this.useCase.execute(query);
        } catch(error) {
            this.logger.error(error);
            throw error;
        }
    }
}
