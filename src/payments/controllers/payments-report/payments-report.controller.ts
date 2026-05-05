import {Controller, Get, Inject, Query,} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {PaymentsReportService} from '../../services/payments-report/payments-report.service';
import {PaymentsReportQuery} from '../../../../core/Payment/Application/Query/PaymentsReportQuery';
import {CreateAppResponse} from "../../../../core/common/Application/CreateAppResponse";
import {ShadowMapDTO} from "../../../../core/Shadow/Application/Response/ShadowMapDTO";
import {IController} from "../../../../core/common/Application/IController";

@ApiTags('Frontend')
@Controller('payment')
export class PaymentsReportController implements IController{
  constructor(@Inject() private service: PaymentsReportService) {}

  @ApiOperation({
    summary: 'Gets a payment report.',
    description: 'Gets a payment report with the given parameters: start, end, page, size and method.',
  })
  @ApiResponse({
    status: 200,
    description: 'The report has been retrieved.',
    type: ShadowMapDTO,
  })
  @ApiResponse({
    status: 500,
    description: 'The report has not been retrieved.',
  })
  @Get('report')
  async execute(
    @Query('start') start: string,
    @Query('end') end: string,
    @Query('page') page: number = 0,
    @Query('size') size: number = 10,
    @Query('method') method: string,
  ) {
      const query = new PaymentsReportQuery(page, size, start, end, method);
      const data = await this.service.execute(query);
      return CreateAppResponse.successResponse(
          'The report has been created',
          data
      )
  }
}
