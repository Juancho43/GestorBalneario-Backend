import {Controller, Get, Inject, Query,} from '@nestjs/common';
import {ClientSearcherService} from '../../services/client-searcher/client-searcher.service';
import {ClientSearchQuery} from '../../../../core/Client/Application/Queries/ClientSearchQuery';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {CreateAppResponse} from "../../../../core/common/Application/CreateAppResponse";
import {IController} from "../../../../core/common/Application/IController";
import {ClientDetailsDTO} from "../../../../core/Client/Application/DTO/ClientDetailsDTO";

@ApiTags('Frontend')
@Controller('client')
export class ClientSearcherController implements IController{
  constructor(@Inject() private service: ClientSearcherService) {}
    @ApiOperation({
        summary: 'Client searcher',
        description: 'Search a client by name, phone or email.',
    })
    @ApiResponse({
        status: 200,
        description: 'The clients has been searched.',
        type: ClientDetailsDTO,
    })
    @ApiResponse({
        status: 500,
        description: 'The clients has not been searched. Server Error',
    })
  @Get('search')
  async execute(
    @Query('query') query: string,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
      const searchQuery = new ClientSearchQuery(page, limit, query);
      const data = await this.service.execute(searchQuery);
      return CreateAppResponse.successResponse('The clients have been searched successfully',data);
  }
}
