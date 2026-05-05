import {Body, Controller, HttpException, HttpStatus, Inject, Put,} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import {SetActiveSeasonCommand} from '../../../../core/Season/Application/Commads/SetActiveSeasonCommand';
import {SetActiveSeasonService} from '../../services/set-active-season/set-active-season.service';
import {IController} from "../../../../core/common/Application/IController";
import {CreateAppResponse} from "../../../../core/common/Application/CreateAppResponse";

@ApiTags('Frontend')
@Controller('season')
export class SetActiveSeasonController implements IController{
  constructor(@Inject() private service: SetActiveSeasonService) {}

  @Put('activate')
  async execute(@Body() command: SetActiveSeasonCommand) {
    const data = await this.service.execute(command);
    return CreateAppResponse.successResponse('The active season has been set',data)
  }
}
