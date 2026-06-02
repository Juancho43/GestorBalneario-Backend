import {Controller, Get, Inject, Param, Query,} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {CreateAppResponse} from "../../../../core/common/Application/CreateAppResponse";
import {IController} from "../../../../core/common/Application/IController";
import {GetSeasonInvoicesService} from "../../services/get-season-invoices/get-season-invoices.service";
import {GetSeasonInvoicesQuery} from "../../../../core/Invoice/Application/Queries/GetSeasonInvoicesQuery";

@ApiTags('Frontend')
@Controller('invoice')
export class GetSeasonInvoicesController implements IController {

  constructor(@Inject() private service:GetSeasonInvoicesService) {
  }

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
      @Query('state') state: string = 'ALL'
  ) {
    const query = new GetSeasonInvoicesQuery(page, size,id,state);
    const data = await this.service.execute(query);
    return CreateAppResponse.successResponse('The invoices has been retrieved',data)
  }
}
