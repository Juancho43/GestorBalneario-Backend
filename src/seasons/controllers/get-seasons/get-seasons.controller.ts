import {Controller, Get, Inject, Query} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";
import {GetClientsQuery} from "../../../../core/Client/Application/DTO/GetClientsQuery";
import {GetSeasonsService} from "../../services/get-seasons/get-seasons.service";

@ApiTags('Season')
@Controller('seasons')
export class GetSeasonsController {

    constructor(@Inject() private service: GetSeasonsService) {}
    @Get('current')
    async execute(@Query('page') page: number = 1, @Query('size') size: number = 10) {
        const query = new GetClientsQuery('',page, size);
        return await this.service.execute();
    }
}
