import {Controller, Get, HttpException, HttpStatus, Inject,} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {GetActiveReservationsService} from '../../services/get-active-reservations/get-active-reservations.service';
import {ReservationResponse} from '../../../../core/Reservation/Application/DTO/ReservationResponse';
import {IController} from "../../../../core/common/Application/IController";
import {CreateAppResponse} from "../../../../core/common/Application/CreateAppResponse";

@ApiTags('Frontend')
@Controller('reservation')
export class GetActiveReservationsController implements IController {
  constructor(@Inject() private service: GetActiveReservationsService) {}

  @Get('active')
  @ApiOperation({
    summary: 'Gets reservations',
    description: 'Gets the current active reservations.',
  })
  @ApiResponse({
    status: 200,
    description: 'The reservations has been retrieved.',
  })
  @ApiResponse({
    status: 500,
    description: 'The reservations has not been retrieved.',
  })
  async execute() {

      const data = ReservationResponse.createList(await this.service.execute());
      return CreateAppResponse.successResponse(
          'The reservations has been retrieved',
          data,
          200
      )
  }
}
