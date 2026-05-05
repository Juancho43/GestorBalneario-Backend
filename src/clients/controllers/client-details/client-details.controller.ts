import {Controller, Get, Inject, Param, Query,} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {ClientDetailsService} from '../../services/client-details/client-details.service';
import {ClientDetailQuery} from '../../../../core/Client/Application/Queries/ClientDetailQuery';
import {CreateAppResponse} from "../../../../core/common/Application/CreateAppResponse";
import {IController} from "../../../../core/common/Application/IController";
import {ClientResponse} from "../../../../core/Client/Application/DTO/ClientResponse";
import {ClientDetailsDTO} from "../../../../core/Client/Application/DTO/ClientDetailsDTO";

@ApiTags('Frontend')
@Controller('client')
export class ClientDetailsController implements IController {
  constructor(@Inject() private service: ClientDetailsService) {}
    @ApiOperation({
        summary: 'Gets a client details',
        description: 'Gets a client by id with its paginated invoices.',
    })
    @ApiResponse({
        status: 200,
        description: 'The client details has been retrieved.',
        type: ClientDetailsDTO,
    })
    @ApiResponse({
        status: 500,
        description: 'The client details has not been retrieved. Server Error',
    })
  @Get('detail/:id')
  async execute(
      @Param('id') id: string,
      @Query('page') page: number=0,
      @Query('limit') limit: number = 10,
  ) {
      const data = await this.service.execute(new ClientDetailQuery(page, limit, id))
      return CreateAppResponse.successResponse('The client details have been retrieved successfully', data);
  }
}
