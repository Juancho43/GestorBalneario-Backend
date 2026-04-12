import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetSeasonServicesService } from '../../service/get-season-services/get-season-services.service';
import { GetSeasonServicesQuery } from '../../../../core/Service/Application/Queries/GetSeasonServicesQuery';
@ApiTags('Frontend')
@Controller('service')
export class GetSeasonServicesController {
  constructor(@Inject() private service: GetSeasonServicesService) {}
  @Get('season/:id')
  execute(
    @Param('id') id: string,
    @Query('page') page: number = 0,
    @Query('size') size: number = 10,
  ) {
    try {
      return this.service.execute(new GetSeasonServicesQuery(page, size, id));
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
