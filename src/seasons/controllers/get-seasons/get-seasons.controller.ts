import {Controller, Get, HttpException, HttpStatus, Inject, Query} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {GetClientsQuery} from "../../../../core/Client/Application/DTO/GetClientsQuery";
import {GetSeasonsService} from "../../services/get-seasons/get-seasons.service";

@ApiTags('Season')
@Controller('seasons')
export class GetSeasonsController {

    constructor(@Inject() private service: GetSeasonsService) {}
    @Get('current')
    @ApiOperation({summary: 'Gets seasons', description: 'Gets a list of seasons.' })
    @ApiResponse({status: 200, description: 'The seasons has been retrieved.'})
    @ApiResponse({status: 500, description: 'The seasons has not been retrieved.'})
    async execute(@Query('page') page: number = 1, @Query('size') size: number = 10) {
        try {
            const query = new GetClientsQuery('',page, size);
            return await this.service.execute();
        }catch (error) {
            return new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }
}
