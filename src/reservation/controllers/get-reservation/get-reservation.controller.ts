import {Controller, Get, Inject, Param} from '@nestjs/common';
import {GetShadowService} from "../../../shadow/services/get-shadow/get-shadow.service";
import {GetShadowByIdQuery} from "../../../../core/Shadow/Application/DTO/GetShadowByIdQuery";
import {GetReservationService} from "../../services/get-reservation/get-reservation.service";
import {GetReservationQuery} from "../../../../core/Reservation/Application/DTO/GetReservationQuery";

@Controller('reservation')
export class GetReservationController {

    constructor(@Inject() private service: GetReservationService) {
    }
    @Get('get/:id')
    async get(@Param('id') id: string) {
        const query = new GetReservationQuery(id);
        return await this.service.execute(query);

    }}
