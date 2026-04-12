import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CloneSeasonCommand } from '../../../../core/Season/Application/Commads/CloneSeasonCommand';
import { SeasonResponse } from '../../../../core/Season/Application/DTO/SeasonResponse';
import { CloneSeasonService } from '../../services/clone-season/clone-season.service';
@ApiTags('Frontend')
@Controller('season')
export class CloneSeasonController {
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
  execute(@Body() request: CloneSeasonCommand) {
    try {
      return this.service.execute(request);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
