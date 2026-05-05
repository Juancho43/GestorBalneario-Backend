import {Controller, Get, Inject, Param, Query} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {GetShadowHistoryService} from '../../services/get-shadow-history/get-shadow-history.service';
import {GetShadowHistoryQuery} from '../../../../core/Shadow/Application/Queries/GetShadowHistoryQuery';
import {ShadowHistoryDTO} from '../../../../core/Shadow/Application/Response/ShadowHistoryDTO';
import {CreateAppResponse} from '../../../../core/common/Application/CreateAppResponse';
import {IController} from '../../../../core/common/Application/IController';

@ApiTags('Frontend')
@Controller('shadow')
export class ShadowHistoryController implements IController {
  constructor(@Inject() private service: GetShadowHistoryService) {}
  @Get('history/:id')
  @ApiOperation({
    summary: 'Get the history of the shadow reservations',
    description: 'Gets all the reservation of a shadows.',
  })
  @ApiResponse({
    status: 200,
    description: 'The shadow history has been retrieved.',
    type: ShadowHistoryDTO,
  })
  async execute(
    @Param('id') id: string,
    @Query('page') page: number = 0,
    @Query('size') size: number = 10,
  ) {
      const query = new GetShadowHistoryQuery(page, size, id);
      const data = await this.service.execute(query);
      return CreateAppResponse.successResponse(
        'The shadow history has been retrieved',
        data,
      );
  }
}
