import {Body, Controller, Inject, Post} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {SeasonResponse} from '../../../../core/Season/Application/DTO/SeasonResponse';
import {CreateSeasonCommand} from '../../../../core/Season/Application/Commads/CreateSeasonCommand';
import {CreateSeasonService} from '../../services/create-season/create-season.service';
import {CreateAppResponse} from '../../../../core/common/Application/CreateAppResponse';
import {IController} from '../../../../core/common/Application/IController';

@ApiTags('Season')
@Controller('season')
export class CreateSeasonController implements IController {
  constructor(@Inject() private service: CreateSeasonService) {}
  @Post('create')
  @ApiOperation({
    summary: 'Create a season',
    description: 'Creates new season',
  })
  @ApiResponse({
    status: 201,
    description: 'The season has been created.',
    type: SeasonResponse,
  })
  @ApiResponse({
    status: 500,
    description: 'The season has not been created. Server Error',
  })
  async execute(@Body() request: CreateSeasonCommand) {
      const data = SeasonResponse.create(await this.service.execute(request));
      return CreateAppResponse.successResponse(
        'The season has been created',
        data,
        201,
      );
  }
}
