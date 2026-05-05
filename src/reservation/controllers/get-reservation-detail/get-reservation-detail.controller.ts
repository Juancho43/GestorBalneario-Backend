import {Controller, Get, HttpException, HttpStatus, Inject, Param,} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import {GetReservationDetailService} from '../../services/get-reservation-detail/get-reservation-detail.service';
import {CreateAppResponse} from "../../../../core/common/Application/CreateAppResponse";
import {IController} from "../../../../core/common/Application/IController";

@ApiTags('Frontend')
@Controller('reservation')
export class GetReservationDetailController implements IController{
  constructor(@Inject() private service: GetReservationDetailService) {}

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
