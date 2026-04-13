import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SeasonResponse } from '../../../../core/Season/Application/DTO/SeasonResponse';
import { GetSeasonService } from '../../services/get-season/get-season.service';
import { GetByIdQuery } from '../../../../core/common/Application/GetByIdQuery';
@ApiTags('Season')
@Controller('season')
export class GetSeasonController {
  constructor(@Inject() private service: GetSeasonService) {}

  @Get('get/:id')
  @ApiOperation({
    summary: 'Gets a season',
    description: 'Gets a season by id',
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
  async execute(@Param('id') id: string) {
    try {
      return await this.service.execute(new GetByIdQuery(id));
    } catch (error) {
      return new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
