import {Body, Controller, HttpException, HttpStatus, Inject, Put} from '@nestjs/common';
import {EditReservationService} from "../../services/edit-reservation/edit-reservation.service";
import {EditReservationCommand} from "../../../../core/Reservation/Application/DTO/EditReservationCommand";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {ReservationResponse} from "../../../../core/Reservation/Application/DTO/ReservationResponse";

@ApiTags('Reservation')
@Controller('reservation')
export class EditReservationController {

    constructor(@Inject() private readonly service: EditReservationService) {
    }

    @Put('update')
    @ApiOperation({summary: 'Edit a client', description: 'Edits a reservation' })
    @ApiResponse({status: 200, description: 'The reservation has been updated.', type: ReservationResponse})
    @ApiResponse({status: 500, description: 'The reservation has not been updated. Server Error'})
    async execute(@Body()request: EditReservationCommand) {
        try {
            return await this.service.execute(request);
        }catch (error) {
            return new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

}
