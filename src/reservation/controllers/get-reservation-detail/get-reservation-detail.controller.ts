import {Controller, Get, Inject, Param,} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {GetReservationDetailService} from '../../services/get-reservation-detail/get-reservation-detail.service';
import {CreateAppResponse} from "../../../../core/common/Application/CreateAppResponse";
import {IController} from "../../../../core/common/Application/IController";

@ApiTags('Frontend')
@Controller('reservation')
export class GetReservationDetailController implements IController{
  constructor(@Inject() private service: GetReservationDetailService) {}
    @ApiOperation({
        summary: 'Gets a reservation details',
        description: 'Gets a reservation by id with its shadow, client, and invoice.',
    })
    @ApiResponse({
        status: 200,
        description: 'The reservation details has been retrieved.',
    })
    @ApiResponse({
        status: 500,
        description: 'The reservation details has not been retrieved. Server Error',
    })
  @Get('detail/:id')
  async execute(@Param('id') id: string) {
      const data = await this.service.execute(id);
      return CreateAppResponse.successResponse(
          'The reservations details have been retrieved successfully',
          data,
          200
      )
  }
}
