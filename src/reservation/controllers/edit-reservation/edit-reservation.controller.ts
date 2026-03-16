import {Body, Controller, Inject, Put} from '@nestjs/common';
import {EditReservationService} from "../../services/edit-reservation/edit-reservation.service";
import {EditReservationCommand} from "../../../../core/Reservation/Application/DTO/EditReservationCommand";

@Controller('reservation')
export class EditReservationController {

    constructor(@Inject() private readonly service: EditReservationService) {
    }

    @Put('update')
    async createShadow(@Body()request: EditReservationCommand) {
        return await this.service.execute(request);
    }

}
