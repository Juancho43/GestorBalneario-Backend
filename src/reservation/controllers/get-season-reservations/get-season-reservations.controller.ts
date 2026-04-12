import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Frontend')
@Controller('reservation')
export class GetSeasonReservationsController {
  @Get('season/:id')
  execute(
    @Param('id') id: string,
    @Query('page') page: number = 0,
    @Query('size') size: number = 10,
  ) {
    try {
      console.log('HI');
      // return this.service.execute(new GetSeasonServicesQuery(page,size,id));
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
