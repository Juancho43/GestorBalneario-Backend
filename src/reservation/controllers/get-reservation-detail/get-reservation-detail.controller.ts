import {Controller, Get, HttpException, HttpStatus, Inject, Param} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";
import {GetReservationDetailService} from "../../services/get-reservation-detail/get-reservation-detail.service";
@ApiTags('ReservationFronted')
@Controller('reservation')
export class GetReservationDetailController {

    constructor(@Inject() private service: GetReservationDetailService) {
    }

    @Get('detail/:id')
    execute(@Param('id') id: string) {
        try {
            return this.service.execute(id);
        }catch (e) {
            return new HttpException(e.message, HttpStatus.BAD_REQUEST);
        }
    }
}
