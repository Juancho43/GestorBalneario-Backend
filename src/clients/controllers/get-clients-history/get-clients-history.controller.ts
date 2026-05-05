import {Controller, Get, Inject, Query,} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import {GetClientsHistoryService} from '../../services/get-clients-history/get-clients-history.service';
import {PaginatedQuery} from '../../../../core/common/Application/PaginatedQuery';
import {CreateAppResponse} from "../../../../core/common/Application/CreateAppResponse";
import {ClientResponse} from "../../../../core/Client/Application/DTO/ClientResponse";

@ApiTags('Frontend')
@Controller('client')
export class GetClientsHistoryController {
  constructor(@Inject() private service: GetClientsHistoryService) {}

  @Get('history')
  async execute(@Query('page') page: number, @Query('size') size: number) {
      const data =ClientResponse.createList(await this.service.execute(new PaginatedQuery(page, size)));
      return CreateAppResponse.successResponse('The clients have been retrieved successfully',data);
  }
}
