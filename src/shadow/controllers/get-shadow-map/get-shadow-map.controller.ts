import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetShadowMapService } from '../../services/get-shadow-map/get-shadow-map.service';
import { ShadowMapDTO } from '../../../../core/Shadow/Application/Response/ShadowMapDTO';
@ApiTags('Frontend')
@Controller('shadow')
export class GetShadowMapController {
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
  async get(@Query('seasonId') seasonId: string = 'none') {
    try {
      return await this.service.execute(seasonId);
    } catch (error) {
      return new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
