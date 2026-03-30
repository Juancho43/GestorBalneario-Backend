import {Controller, Get, HttpException, HttpStatus, Inject, Param, Query} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {GetShadowHistoryService} from "../../services/get-shadow-history/get-shadow-history.service";
import {GetShadowHistoryQuery} from "../../../../core/Shadow/Application/Queries/GetShadowHistoryQuery";
import {ShadowHistoryDTO} from "../../../../core/Shadow/Application/Response/ShadowHistoryDTO";
@ApiTags('Frontend')
@Controller('shadow')
export class ShadowHistoryController {
    constructor(@Inject() private service: GetShadowHistoryService) {
    }
    @Get('history/:id')
    @ApiOperation({summary: 'Get the history of the shadow reservations', description: 'Gets all the reservation of a shadows.' })
    @ApiResponse({status: 200, description: 'The shadow history has been retrieved.', type: ShadowHistoryDTO})
    execute(@Param('id') id: string, @Query('page') page: number = 0, @Query('size') size: number = 10) {
        try{
            const query = new GetShadowHistoryQuery(id,page,size);
            return this.service.execute(query);
        }catch(error){
            return new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }
}
