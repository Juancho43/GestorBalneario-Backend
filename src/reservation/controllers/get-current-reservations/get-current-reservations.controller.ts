import {GetCurrentReservationService} from "../../services/get-current-reservation/get-current-reservation.service";
import {Body, Controller, Inject, Post} from "@nestjs/common";
import {GetCurrentReservationsQuery} from "../../../../core/Reservation/Application/DTO/GetCurrentReservationsQuery";
import {ApiTags} from "@nestjs/swagger";

@ApiTags('Reservation')
@Controller('reservation')
export class GetCurrentReservationsController {
   constructor(@Inject() private service: GetCurrentReservationService) {
   }
    @Post('current')
    async getCurrentShadows(@Body() query: GetCurrentReservationsQuery) {
        return await this.service.execute(query);
    }
}
