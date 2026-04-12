import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetActiveSeasonService } from '../../services/get-active-season/get-active-season.service';
import { SeasonResponse } from '../../../../core/Season/Application/DTO/SeasonResponse';

@ApiTags('Frontend')
@Controller('season')
export class GetActiveSeasonController {
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
  execute() {
    try {
      return this.service.execute();
    } catch (error) {
      return new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
