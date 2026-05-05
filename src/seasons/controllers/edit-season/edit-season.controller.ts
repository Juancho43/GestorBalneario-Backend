import {Body, Controller, Inject, Put} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {IController} from '../../../../core/common/Application/IController';
import {CreateAppResponse} from '../../../../core/common/Application/CreateAppResponse';
import {SeasonResponse} from '../../../../core/Season/Application/DTO/SeasonResponse';
import {UpdateSeasonService} from '../../services/update-season/update-season.service';
import {UpdateSeasonCommand} from '../../../../core/Season/Application/Commads/UpdateSeasonCommand';

@ApiTags('Season')
@Controller('season')
export class EditSeasonController implements IController {
  constructor(@Inject() private service: UpdateSeasonService) {}
  @Put('update')
  @ApiOperation({ summary: 'Edit a season', description: 'Edits a shadow' })
  @ApiResponse({
    status: 200,
    description: 'The season has been updated.',
    type: SeasonResponse,
  })
  @ApiResponse({
    status: 500,
    description: 'The season has not been updated. Server Error',
  })
  async execute(@Body() request: UpdateSeasonCommand) {
    try {
      const data = await this.service.execute(request);
      return CreateAppResponse.successResponse(
        'The season has been updated successfully',
        data,
      );
    } catch (error) {
      return CreateAppResponse.errorResponse(error);
    }
  }
}
