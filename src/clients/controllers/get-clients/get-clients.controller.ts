import {Body, Controller, Inject, Post} from '@nestjs/common';
import {GetClientsService} from "../../services/get-clients/get-clients.service";
import {GetClientsQuery} from "../../../../core/Client/Application/DTO/GetClientsQuery";
import {ApiTags} from "@nestjs/swagger";

@ApiTags('Client')
@Controller('client')
export class GetClientsController {
    constructor(@Inject() private service: GetClientsService) {
    }
    @Post('current')
    async getCurrentShadows(@Body() query: GetClientsQuery) {
        return await this.service.execute(query);
    }
}
