import {Controller, Get, Inject, Param, Query,} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import {CreateAppResponse} from "../../../../core/common/Application/CreateAppResponse";
import {IController} from "../../../../core/common/Application/IController";
import {GetSeasonReservationsService} from "../../services/get-season-reservations/get-season-reservations.service";
import {GetSeasonEntityQuery} from "../../../../core/Service/Application/Queries/GetSeasonEntityQuery";

@ApiTags('Frontend')
@Controller('reservation')
export class GetSeasonReservationsController implements IController{
  constructor(@Inject() private service: GetSeasonReservationsService) {
  }
  @Get('season/:id')
  async execute(
    @Param('id') id: string,
    @Query('page') page: number = 0,
    @Query('size') size: number = 10,
  ) {
      const query = new GetSeasonEntityQuery(page,size,id);
      const data = await this.service.execute(query);
      return CreateAppResponse.successResponse(
          'Reservations has been retrieved',
          data,
          200
      )
  }
}
