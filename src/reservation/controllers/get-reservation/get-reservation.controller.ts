import {Controller, Get, HttpException, HttpStatus, Inject, Param} from '@nestjs/common';
import {GetReservationService} from "../../services/get-reservation/get-reservation.service";
import {GetReservationQuery} from "../../../../core/Reservation/Application/DTO/GetReservationQuery";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {ReservationResponse} from "../../../../core/Reservation/Application/DTO/ReservationResponse";

@ApiTags('Reservation')
@Controller('reservation')
export class GetReservationController {

    constructor(@Inject() private service: GetReservationService) {
    }
    @Get('get/:id')
    @ApiOperation({summary: 'Get reservation', description: 'Gets a reservation by its id.' })
    @ApiResponse({status: 200, description: 'The reservation has been retrieved.', type: ReservationResponse})
    @ApiResponse({status: 500, description: 'The reservation has not been retrieved.'})
    async execute(@Param('id') id: string) {
        try {
            const query = new GetReservationQuery(id);
            return await this.service.execute(query);
        }catch (error) {
            return new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }
}
