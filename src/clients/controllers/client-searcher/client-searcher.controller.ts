import {Controller, Get, HttpException, HttpStatus, Inject, Query,} from '@nestjs/common';
import {ClientSearcherService} from '../../services/client-searcher/client-searcher.service';
import {ClientSearchQuery} from '../../../../core/Client/Application/Queries/ClientSearchQuery';
import {ApiTags} from '@nestjs/swagger';
import {CreateAppResponse} from "../../../../core/common/Application/CreateAppResponse";
import {IController} from "../../../../core/common/Application/IController";

@ApiTags('Frontend')
@Controller('client')
export class ClientSearcherController implements IController{
  constructor(@Inject() private service: ClientSearcherService) {}
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
