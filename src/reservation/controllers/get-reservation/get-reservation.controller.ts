import {Controller, Get, Inject, Param} from '@nestjs/common';
import {GetReservationService} from "../../services/get-reservation/get-reservation.service";
import {GetReservationQuery} from "../../../../core/Reservation/Application/DTO/GetReservationQuery";
import {ApiTags} from "@nestjs/swagger";

@ApiTags('Reservation')
@Controller('reservation')
export class GetReservationController {

    constructor(@Inject() private service: GetReservationService) {
    }
    @Get('get/:id')
    async get(@Param('id') id: string) {
        const query = new GetReservationQuery(id);
        return await this.service.execute(query);

    }
}
