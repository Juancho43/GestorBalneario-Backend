import {Controller, Get, HttpException, HttpStatus, Inject} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {GetActiveReservationsService} from "../../services/get-active-reservations/get-active-reservations.service";
import {ReservationResponse} from "../../../../core/Reservation/Application/DTO/ReservationResponse";

@ApiTags('Reservation')
@Controller('reservation')
export class GetActiveReservationsController {
    constructor(@Inject() private service: GetActiveReservationsService) {
    }

    @Get('active')
    @ApiOperation({summary: 'Gets reservations', description: 'Gets the current active reservations.' })
    @ApiResponse({status: 200, description: 'The reservations has been retrieved.'})
    @ApiResponse({status: 500, description: 'The reservations has not been retrieved.'})
    async get(){
        try{
            return ReservationResponse.createList(await this.service.execute());
        }catch(error){
            return new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }
}
