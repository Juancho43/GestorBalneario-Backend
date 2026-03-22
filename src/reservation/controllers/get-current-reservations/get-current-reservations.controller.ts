import {GetCurrentReservationService} from "../../services/get-current-reservation/get-current-reservation.service";
import {Body, Controller, Get, HttpException, HttpStatus, Inject, Post, Query} from "@nestjs/common";
import {GetCurrentReservationsQuery} from "../../../../core/Reservation/Application/DTO/GetCurrentReservationsQuery";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";

@ApiTags('Reservation')
@Controller('reservation')
export class GetCurrentReservationsController {
   constructor(@Inject() private service: GetCurrentReservationService) {
   }
    @Get('current')
    @ApiOperation({summary: 'Gets reservations', description: 'Gets all the reservations.' })
    @ApiResponse({status: 200, description: 'The reservations has been retrieved.'})
    @ApiResponse({status: 500, description: 'The reservations has not been retrieved.'})
    async execute(@Query('page') page: number = 1, @Query('size') size: number = 10) {
        try{
            const query = new GetCurrentReservationsQuery('',page, size);
            return await this.service.execute(query);
        }catch(error){
            return new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }
}
