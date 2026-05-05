import {Body, Controller, Inject, Put,} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {SetActiveSeasonCommand} from '../../../../core/Season/Application/Commads/SetActiveSeasonCommand';
import {SetActiveSeasonService} from '../../services/set-active-season/set-active-season.service';
import {IController} from "../../../../core/common/Application/IController";
import {CreateAppResponse} from "../../../../core/common/Application/CreateAppResponse";
import {SeasonResponse} from "../../../../core/Season/Application/DTO/SeasonResponse";

@ApiTags('Frontend')
@Controller('season')
export class SetActiveSeasonController implements IController{
  constructor(@Inject() private service: SetActiveSeasonService) {}

  @ApiOperation({
    summary: 'Sets a season to current',
    description: 'Updates a season to activate state',
  })
  @ApiResponse({
    status: 200,
    description: 'The season has been set to active.',
    type: SeasonResponse,
  })
  @ApiResponse({
    status: 500,
    description: 'The season has not been retrieved. Server Error',
  })
  @Put('activate')
  async execute(@Body() command: SetActiveSeasonCommand) {
    const data = await this.service.execute(command);
    return CreateAppResponse.successResponse('The active season has been set to active',data)
  }
}
