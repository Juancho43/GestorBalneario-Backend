import {Controller, Get, Param, Query} from '@nestjs/common';
import {ApiOperation, ApiTags} from "@nestjs/swagger";
@ApiTags()
@Controller('shadow')
export class ShadowHistoryController {
    @Get('history/:id')
    @ApiOperation({summary: 'Get the history of the shadow reservations', description: 'Gets all the reservation of a shadows.' })
    get(@Param('id') id: string, @Query('page') page: number = 1, @Query('size') size: number = 10) {
        console.log(`Getting history for shadow with id: ${id}, page: ${page}, size: ${size}`);
    }
}
