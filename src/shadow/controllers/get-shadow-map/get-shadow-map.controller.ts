import {Controller, Get, Inject, Query} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {GetShadowMapService} from '../../services/get-shadow-map/get-shadow-map.service';
import {ShadowMapDTO} from '../../../../core/Shadow/Application/Response/ShadowMapDTO';
import {CreateAppResponse} from '../../../../core/common/Application/CreateAppResponse';
import {IController} from '../../../../core/common/Application/IController';

@ApiTags('Frontend')
@Controller('shadow')
export class GetShadowMapController implements IController {
  constructor(@Inject() private service: GetShadowMapService) {}

  @Get('map')
  @ApiOperation({
    summary: 'Get the shadow map status',
    description: 'Gets the shadow map with the status',
  })
  @ApiResponse({
    status: 200,
    description: 'The shadow map has been retrieved.',
    type: ShadowMapDTO,
  })
  @ApiResponse({
    status: 500,
    description: 'The shadow map has not been retrieved.',
  })
  async execute(@Query('seasonId') seasonId: string = 'none') {
      const data = await this.service.execute(seasonId);
      return CreateAppResponse.successResponse(
        'The shadow map has been retrieved.',
        data,
      );
  }
}
