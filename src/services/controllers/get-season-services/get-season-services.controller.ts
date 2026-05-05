import {Controller, Get, Inject, Param, Query} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import {GetSeasonServicesService} from '../../service/get-season-services/get-season-services.service';
import {GetSeasonEntityQuery} from '../../../../core/Service/Application/Queries/GetSeasonEntityQuery';
import {CreateAppResponse} from '../../../../core/common/Application/CreateAppResponse';
import {IController} from '../../../../core/common/Application/IController';

@ApiTags('Frontend')
@Controller('service')
export class GetSeasonServicesController implements IController {
  constructor(@Inject() private service: GetSeasonServicesService) {}
  @Get('season/:id')
  async execute(
    @Param('id') id: string,
    @Query('page') page: number = 0,
    @Query('size') size: number = 10,
  ) {
      const data = await this.service.execute(
        new GetSeasonEntityQuery(page, size, id),
      );
      return CreateAppResponse.successResponse(
        'Season services retrieved successfully',
        data,
      );
  }
}
