import {Controller, Get, Inject, Query,} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {GetActiveReservationsService} from '../../services/get-active-reservations/get-active-reservations.service';
import {IController} from "../../../../core/common/Application/IController";
import {CreateAppResponse} from "../../../../core/common/Application/CreateAppResponse";
import {PaginatedQuery} from "../../../../core/common/Application/PaginatedQuery";

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
  async execute(
      @Query('page') page: number = 0,
      @Query('size') size: number = 10
  ) {
      const query = new PaginatedQuery(page, size)
      const data = await this.service.execute(query);
      return CreateAppResponse.successResponse(
          'The reservations has been retrieved',
          data,
          200
      )
  }
}
