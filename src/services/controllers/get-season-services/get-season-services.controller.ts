import {Controller, Get, Inject, Param, Query} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {GetSeasonServicesService} from '../../service/get-season-services/get-season-services.service';
import {CreateAppResponse} from '../../../../core/common/Application/CreateAppResponse';
import {IController} from '../../../../core/common/Application/IController';
import {GetSeasonServicesQuery} from "../../../../core/Service/Application/Queries/GetSeasonServicesQuery";

@ApiTags('Frontend')
@Controller('service')
export class GetSeasonServicesController implements IController {
  constructor(@Inject() private service: GetSeasonServicesService) {}

    @ApiOperation({
        summary: 'Gets a paginated service list',
        description: 'Gets a paginated service list by season.',
    })
    @ApiResponse({
        status: 200,
        description: 'The services has been retrieved.',
    })
    @ApiResponse({
        status: 500,
        description: 'The services has not been retrieved. Server Error',
    })
  @Get('season/:id')
  async execute(
    @Param('id') id: string,
    @Query('page') page: number = 0,
    @Query('size') size: number = 10,
    @Query('type') type: string = 'ALL'
  ) {
      const data = await this.service.execute(
        new GetSeasonServicesQuery(page, size, id, type),
      );
      return CreateAppResponse.successResponse(
        'The services has been retrieved',
        data,
      );
  }
}
