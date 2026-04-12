import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Inject,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SetActiveSeasonCommand } from '../../../../core/Season/Application/Commads/SetActiveSeasonCommand';
import { SetActiveSeasonService } from '../../services/set-active-season/set-active-season.service';
@ApiTags('Frontend')
@Controller('season')
export class SetActiveSeasonController {
  constructor(@Inject() private service: SetActiveSeasonService) {}

  @Put('activate')
  execute(@Body() command: SetActiveSeasonCommand) {
    try {
      this.service.execute(command);
    } catch (error) {
      return new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
