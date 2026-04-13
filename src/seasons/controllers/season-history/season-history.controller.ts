import {Controller, Get, HttpException, HttpStatus, Inject, Query} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {GetSeasonsHistoryService} from "../../services/get-seasons-history/get-seasons-history.service";
import {GetSeasonsHistoryQuery} from "../../../../core/Season/Application/Queries/GetSeasonsHistoryQuery";
@ApiTags('Frontend')
@Controller('season')
export class SeasonHistoryController {

  constructor(@Inject() private service: GetSeasonsHistoryService) {
  }

  @Get('history')
  execute(@Query('page') page: number, @Query('size') size: number) {
   try {
    return this.service.execute(new GetSeasonsHistoryQuery(page,size))
   } catch (e) {
      throw new HttpException(e.message,HttpStatus.INTERNAL_SERVER_ERROR);
   }
  }
}
