import {Body, Controller, HttpException, HttpStatus, Inject, Post} from '@nestjs/common';
import {CreateReservationService} from "../../services/create-reservation/create-reservation.service";
import {CreateReservationCommand} from "../../../../core/Reservation/Application/DTO/CreateReservationCommand";
import {ApiResponse, ApiTags} from "@nestjs/swagger";
import {ReservationResponse} from "../../../../core/Reservation/Application/DTO/ReservationResponse";
@ApiTags('Reservation')
@Controller('reservation')
export class CreateReservationController {
    constructor(@Inject() private service: CreateReservationService) {
    }
    @Post('create')
    @ApiResponse({
        status: 201,
        description: 'The reservation has been created.',
        type: ReservationResponse
    })
    @ApiResponse({status:500, description: 'The reservation has not been created.'})
    async execute(@Body()request: CreateReservationCommand) {
        try {
            return await this.service.execute(request);
        }catch (error) {
            return new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }
}
