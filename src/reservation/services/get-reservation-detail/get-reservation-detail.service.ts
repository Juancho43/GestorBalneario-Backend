import {Inject, Injectable, Logger} from '@nestjs/common';
import {GetReservationDetail} from "../../../../core/Reservation/Application/GetReservationDetail";
import type{GetReservationDetailsDAO} from "../../../../core/Reservation/Model/DAO/GetReservationDetailsDAO";
import {GetReservationQuery} from "../../../../core/Reservation/Application/DTO/GetReservationQuery";

@Injectable()
export class GetReservationDetailService {
    private logger = new Logger(GetReservationDetailService.name);
    private useCase : GetReservationDetail;


    constructor(@Inject('GET_DETAILS') dao: GetReservationDetailsDAO) {
        this.useCase = new GetReservationDetail(dao);
    }
    async execute(id: string) {
        try {
            this.logger.debug(`Executing GetReservationDetailService with id: ${id}`);
            return await this.useCase.execute(new GetReservationQuery(id));
        }catch (e) {
            this.logger.error(e);
            throw e;
        }
    }
}
