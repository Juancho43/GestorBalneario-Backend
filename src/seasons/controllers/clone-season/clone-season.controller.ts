import {Body, Controller, Inject, Post} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {CloneSeasonCommand} from '../../../../core/Season/Application/Commads/CloneSeasonCommand';
import {SeasonResponse} from '../../../../core/Season/Application/DTO/SeasonResponse';
import {CloneSeasonService} from '../../services/clone-season/clone-season.service';
import {CreateAppResponse} from '../../../../core/common/Application/CreateAppResponse';
import {IController} from '../../../../core/common/Application/IController';

@ApiTags('Frontend')
@Controller('season')
export class CloneSeasonController implements IController {
  constructor(@Inject() private service: CloneSeasonService) {}

  @Post('clone')
  @ApiOperation({
    summary: 'Clone a season',
    description: 'Clone shadows and services into a new season',
  })
  @ApiResponse({
    status: 201,
    description: 'The season has been cloned.',
    type: SeasonResponse,
  })
  @ApiResponse({
    status: 500,
    description: 'The season has not been cloned. Server Error',
  })
  async execute(@Body() request: CloneSeasonCommand) {
      const data = this.service.execute(request);
      return CreateAppResponse.successResponse(
        'The season has been cloned.',
        data,
        201,
      );
  }
}
