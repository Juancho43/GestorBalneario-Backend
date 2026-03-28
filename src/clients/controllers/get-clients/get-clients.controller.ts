import {Controller, Get, Inject, Query} from '@nestjs/common';
import {GetClientsService} from "../../services/get-clients/get-clients.service";
import {GetClientsQuery} from "../../../../core/Client/Application/DTO/GetClientsQuery";
import {ApiTags} from "@nestjs/swagger";

@ApiTags('Client')
@Controller('client')
export class GetClientsController {
    constructor(@Inject() private service: GetClientsService) {
    }
    @Get('current')
    async execute(@Query('page') page: number = 1, @Query('size') size: number = 10) {
        const query = new GetClientsQuery('',page, size);
        return await this.service.execute(query);

    }
}
