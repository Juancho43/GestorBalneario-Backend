import {Injectable, Logger} from '@nestjs/common';
import {GetSeasonEntityQuery} from "../../../../core/Service/Application/Queries/GetSeasonEntityQuery";

@Injectable()
export class GetSeasonReservations {
    private logger = new Logger(GetSeasonReservations.name);
    //
    // constructor(
    //     @Inject(SERVICE_TOKEN.USECASE.GET_SEASON_SERVICE)
    //     private useCase: GetSeasonServices,
    // ) {}

    async execute(query: GetSeasonEntityQuery) {
        try {
            // this.logger.debug('Executing GetSeasonReservationsService', query);
            // return this.useCase.execute(query);
            return null;
        } catch (error) {
            this.logger.error(error);
            throw error;
        }
    }
}
