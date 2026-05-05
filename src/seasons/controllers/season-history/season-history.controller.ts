import {Controller, Get, Inject, Query} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import {GetSeasonsHistoryService} from '../../services/get-seasons-history/get-seasons-history.service';
import {GetSeasonsHistoryQuery} from '../../../../core/Season/Application/Queries/GetSeasonsHistoryQuery';
import {CreateAppResponse} from '../../../../core/common/Application/CreateAppResponse';
import {IController} from '../../../../core/common/Application/IController';
import {SeasonResponse} from "../../../../core/Season/Application/DTO/SeasonResponse";

@ApiTags('Frontend')
@Controller('season')
export class SeasonHistoryController implements IController {
  constructor(@Inject() private service: GetSeasonsHistoryService) {}

  @Get('history')
  async execute(@Query('page') page: number, @Query('size') size: number) {
      const data =SeasonResponse.createList( await this.service.execute(
        new GetSeasonsHistoryQuery(page, size),
      ));
      return CreateAppResponse.successResponse(
        'The seasons has been retrieved successfully',
        data,
      );
  }
}
