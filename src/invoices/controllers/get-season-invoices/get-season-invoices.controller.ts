import {Controller, Get, Param, Query,} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {CreateAppResponse} from "../../../../core/common/Application/CreateAppResponse";
import {IController} from "../../../../core/common/Application/IController";

@ApiTags('Frontend')
@Controller('invoice')
export class GetSeasonInvoicesController implements IController {
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
      // return await this.service.execute(null);
    const data = null;
    return CreateAppResponse.successResponse('The invoices has been retrieved',data)
  }
}
