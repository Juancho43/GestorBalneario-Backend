import {Controller, Get, Inject, Param, Query,} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import {CreateAppResponse} from "../../../../core/common/Application/CreateAppResponse";
import {IController} from "../../../../core/common/Application/IController";

@ApiTags('Frontend')
@Controller('reservation')
export class GetSeasonReservationsController implements IController{
  constructor(@Inject() private service) {
  }
  @Get('season/:id')
  async execute(
    @Param('id') id: string,
    @Query('page') page: number = 0,
    @Query('size') size: number = 10,
  ) {
      const data = null;
      return CreateAppResponse.successResponse(
          'Reservations has been retrieved',
          data,
          200
      )
      // return this.service.execute(new GetSeasonServicesQuery(page,size,id));
  }
}
