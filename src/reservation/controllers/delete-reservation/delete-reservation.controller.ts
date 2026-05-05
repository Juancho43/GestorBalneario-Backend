import {Controller, Delete, HttpException, Inject, Param,} from '@nestjs/common';
import {DeleteReservationService} from '../../services/delete-reservation/delete-reservation.service';
import {DeleteReservationCommand} from '../../../../core/Reservation/Application/Commands/DeleteReservationCommand';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {IController} from "../../../../core/common/Application/IController";
import {DeleteCommand} from "../../../../core/common/Application/DeleteCommand";
import {CreateAppResponse} from "../../../../core/common/Application/CreateAppResponse";

@ApiTags('Reservation')
@Controller('reservation')
export class DeleteReservationController implements IController {
  constructor(@Inject() private service: DeleteReservationService) {}
  @Delete('delete/:id')
  @ApiOperation({
    summary: 'Delete a reservation',
    description: 'Delete a reservation by id',
  })
  @ApiResponse({
    status: 204,
    description: 'The reservation has been deleted.',
  })
  @ApiResponse({
    status: 500,
    description: 'The reservation has not been deleted. Server Error',
  })
  async execute(@Param('id') request) {
      await this.service.execute(new DeleteCommand(request));
      return CreateAppResponse.successResponse(
          'The reservation has been deleted.',
          null,
          204
      )
  }
}
