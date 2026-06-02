import {Inject, Injectable, Logger} from '@nestjs/common';
import {ReservationSearchQuery} from "../../../../core/Reservation/Application/Queries/ReservationSearchQuery";
import {ReservationResponse} from "../../../../core/Reservation/Application/DTO/ReservationResponse";
import {ReservationSearch} from "../../../../core/Reservation/Application/UseCase/ReservationSearch";
import {RESERVATION_TOKEN} from "../../RESERVATION_TOKEN";

@Injectable()
export class ReservationSearcherService {

    private logger = new Logger(ReservationSearcherService.name);

    constructor(
        @Inject(RESERVATION_TOKEN.USECASE.SEARCHER) private useCase: ReservationSearch,
    ) {}

    execute(query: ReservationSearchQuery): Promise<ReservationResponse[]> {
        try {
            this.logger.debug('Executing ReservationSearcherService', query);
            return this.useCase.execute(query);
        } catch (error) {
            this.logger.error(error);
            throw error;
        }
    }
}
