import {Controller, Get, HttpException, HttpStatus, Inject, Query} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";
import {GetClientsHistoryService} from "../../services/get-clients-history/get-clients-history.service";
import {PaginatedQuery} from "../../../../core/common/Application/PaginatedQuery";
@ApiTags('Frontend')
@Controller('client')
export class GetClientsHistoryController {
    constructor(@Inject() private service: GetClientsHistoryService) {
  }

  @Get('history')
  execute(@Query('page') page: number, @Query('size') size: number) {
   try {
    return this.service.execute(new PaginatedQuery(page,size))
   } catch (e) {
      throw new HttpException(e.message,HttpStatus.INTERNAL_SERVER_ERROR);
   }
  }
}

