import {Controller, Get, Inject} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {GetActiveSeasonService} from '../../services/get-active-season/get-active-season.service';
import {SeasonResponse} from '../../../../core/Season/Application/DTO/SeasonResponse';
import {CreateAppResponse} from '../../../../core/common/Application/CreateAppResponse';
import {IController} from '../../../../core/common/Application/IController';

@ApiTags('Frontend')
@Controller('season')
export class GetActiveSeasonController implements IController {
  constructor(@Inject() private service: GetActiveSeasonService) {}

  @Get('active')
  @ApiOperation({
    summary: 'Gets a season',
    description: 'Gets the current active season',
  })
  @ApiResponse({
    status: 200,
    description: 'The season has been retrieved.',
    type: SeasonResponse,
  })
  @ApiResponse({
    status: 500,
    description: 'The season has not been retrieved. Server Error',
  })
  async execute() {
      const data = await this.service.execute();
      return CreateAppResponse.successResponse(
        'The current season has been retrieved',
        data,
      );
  }
}
