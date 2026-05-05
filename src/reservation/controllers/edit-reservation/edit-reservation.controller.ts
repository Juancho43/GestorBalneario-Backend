import {Body, Controller, HttpException, HttpStatus, Inject, Put,} from '@nestjs/common';
import {EditReservationService} from '../../services/edit-reservation/edit-reservation.service';
import {UpdateReservationCommand} from '../../../../core/Reservation/Application/Commands/UpdateReservationCommand';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {ReservationResponse} from '../../../../core/Reservation/Application/DTO/ReservationResponse';
import {CreateAppResponse} from '../../../../core/common/Application/CreateAppResponse';
import {IController} from "../../../../core/common/Application/IController";

@ApiTags('Reservation')
@Controller('reservation')
export class EditReservationController implements IController{
  constructor(@Inject() private readonly service: EditReservationService) {}

  @Put('update')
  @ApiOperation({
    summary: 'Edit a reservation',
    description: 'Edits a reservation',
  })
  @ApiResponse({
    status: 200,
    description: 'The reservation has been updated.',
    type: ReservationResponse,
  })
  @ApiResponse({
    status: 500,
    description: 'The reservation has not been updated. Server Error',
  })
  async execute(@Body() request: UpdateReservationCommand) {
      const data = ReservationResponse.create(
        await this.service.execute(request),
      );
      return CreateAppResponse.successResponse(
        'The reservation has been updated.',
        data,
        201
      );
  }
}
