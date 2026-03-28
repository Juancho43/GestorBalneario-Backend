import {Controller, Get, Inject, Param, Query} from '@nestjs/common';
import {ApiOperation, ApiTags} from "@nestjs/swagger";
import {GetShadowHistoryService} from "../../services/get-shadow-history/get-shadow-history.service";
import {GetShadowHistoryQuery} from "../../../../core/Shadow/Application/DTO/GetShadowHistoryQuery";
@ApiTags('ShadowFronted')
@Controller('shadow')
export class ShadowHistoryController {
    constructor(@Inject() private service: GetShadowHistoryService) {
    }
    @Get('history/:id')
    @ApiOperation({summary: 'Get the history of the shadow reservations', description: 'Gets all the reservation of a shadows.' })
    get(@Param('id') id: string, @Query('page') page: number = 0, @Query('size') size: number = 10) {
        try{
            const query = new GetShadowHistoryQuery(id,page,size);
            return this.service.execute(query);
        }catch(error){
            return error;
        }
    }
}
