import {GetCurrentReservationService} from "../../services/get-current-reservation/get-current-reservation.service";
import {Body, Controller, Inject, Post} from "@nestjs/common";
import {GetCurrentReservationsQuery} from "../../../../core/Reservation/Application/DTO/GetCurrentReservationsQuery";

@Controller('reservation')
export class GetCurrentReservationsController {
   constructor(@Inject() private service: GetCurrentReservationService) {
   }
    @Post('current')
    async getCurrentShadows(@Body() query: GetCurrentReservationsQuery) {
        return await this.service.execute(query);
    }
}
