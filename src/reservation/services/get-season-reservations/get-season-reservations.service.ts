import {Inject, Injectable, Logger} from '@nestjs/common';
import {GetSeasonEntityQuery} from "../../../../core/Service/Application/Queries/GetSeasonEntityQuery";
import {RESERVATION_TOKEN} from "../../RESERVATION_TOKEN";
import {GetSeasonReservations} from "../../../../core/Reservation/Application/UseCase/GetSeasonReservations";

@Injectable()
export class GetSeasonReservationsService {
    private logger = new Logger(GetSeasonReservationsService.name);

    constructor(
        @Inject(RESERVATION_TOKEN.USECASE.GET_SEASON_RESERVATIONS)
        private useCase: GetSeasonReservations,
    ) {}

    async execute(query: GetSeasonEntityQuery) {
        try {
            this.logger.debug('Executing GetSeasonReservationsService', query);
            return this.useCase.execute(query);
        } catch (error) {
            this.logger.error(error);
            throw error;
        }
    }
}
