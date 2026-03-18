import {Controller, Get, Inject} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";
import {GetActiveReservationsService} from "../../services/get-active-reservations/get-active-reservations.service";
import {ReservationResponse} from "../../../../core/Reservation/Application/DTO/ReservationResponse";

@ApiTags('Reservation')
@Controller('reservation')
export class GetActiveReservationsController {
    constructor(@Inject() private service: GetActiveReservationsService) {
    }

    @Get('active')
    async get(){
        return ReservationResponse.createList(await this.service.execute());
    }
}
