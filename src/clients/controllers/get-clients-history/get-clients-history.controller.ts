import {Controller, Get, Inject, Query,} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {GetClientsHistoryService} from '../../services/get-clients-history/get-clients-history.service';
import {PaginatedQuery} from '../../../../core/common/Application/PaginatedQuery';
import {CreateAppResponse} from "../../../../core/common/Application/CreateAppResponse";
import {ClientResponse} from "../../../../core/Client/Application/DTO/ClientResponse";
import {ClientDetailsDTO} from "../../../../core/Client/Application/DTO/ClientDetailsDTO";

@ApiTags('Frontend')
@Controller('client')
export class GetClientsHistoryController {
  constructor(@Inject() private service: GetClientsHistoryService) {}
    @ApiOperation({
        summary: 'Gets a paginated client list',
        description: 'Gets a paginated client list.',
    })
    @ApiResponse({
        status: 200,
        description: 'The clients has been retrieved.',
        type: ClientDetailsDTO,
    })
    @ApiResponse({
        status: 500,
        description: 'The client has not been retrieved. Server Error',
    })
  @Get('history')
  async execute(@Query('page') page: number, @Query('size') size: number) {
      const data =ClientResponse.createList(await this.service.execute(new PaginatedQuery(page, size)));
      return CreateAppResponse.successResponse('The clients have been retrieved successfully',data);
  }
}
