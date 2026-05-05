import {Controller, Get, Inject, Param,} from '@nestjs/common';
import {GetReservationService} from '../../services/get-reservation/get-reservation.service';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {ReservationResponse} from '../../../../core/Reservation/Application/DTO/ReservationResponse';
import {IController} from "../../../../core/common/Application/IController";
import {CreateAppResponse} from "../../../../core/common/Application/CreateAppResponse";
import {GetByIdQuery} from "../../../../core/common/Application/GetByIdQuery";

@ApiTags('Reservation')
@Controller('reservation')
export class GetReservationController implements IController{
  constructor(@Inject() private service: GetReservationService) {}
  @Get('get/:id')
  @ApiOperation({
    summary: 'Get reservation',
    description: 'Gets a reservation by its id.',
  })
  @ApiResponse({
    status: 200,
    description: 'The reservation has been retrieved.',
    type: ReservationResponse,
  })
  @ApiResponse({
    status: 500,
    description: 'The reservation has not been retrieved.',
  })
  async execute(@Param('id') id: string) {
      const data = ReservationResponse.create(
          await this.service.execute(new GetByIdQuery(id)),
      )
      return CreateAppResponse.successResponse(
          'The reservation has been retrieved.',
          data
      )
  }
}
