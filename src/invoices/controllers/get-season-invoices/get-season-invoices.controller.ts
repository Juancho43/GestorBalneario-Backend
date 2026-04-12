import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
@ApiTags('Frontend')
@Controller('invoice')
export class GetSeasonInvoicesController {
  @Get('season/:id')
  @ApiOperation({
    summary: 'Gets invoices',
    description: 'Gets a list of current invoices.',
  })
  @ApiResponse({ status: 200, description: 'The invoices has been retrieved.' })
  @ApiResponse({
    status: 500,
    description: 'The invoices has not been retrieved.',
  })
  async execute(
    @Param('id') id: string,
    @Query('page') page: number = 1,
    @Query('size') size: number = 10,
  ) {
    try {
      // return await this.service.execute(null);
    } catch (e) {
      return new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }
}
