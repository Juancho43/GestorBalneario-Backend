import {Body, Controller, Inject, Post} from '@nestjs/common';
import {CreateReservationService} from "../../services/create-reservation/create-reservation.service";
import {CreateReservationCommand} from "../../../../core/Reservation/Application/DTO/CreateReservationCommand";
import {ApiTags} from "@nestjs/swagger";
@ApiTags('Reservation')
@Controller('reservation')
export class CreateReservationController {
    constructor(@Inject() private service: CreateReservationService) {
    }
    @Post('create')
    async createShadow(@Body()request: CreateReservationCommand) {
        return await this.service.execute(request);
    }
}
