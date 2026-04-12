import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Frontend')
@Controller('season')
export class SeasonHistoryController {
  @Get('history')
  execute(@Query('page') page: number, @Query('size') size: number) {}
}
