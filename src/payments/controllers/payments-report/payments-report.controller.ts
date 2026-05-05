import {Controller, Get, HttpException, HttpStatus, Inject, Query,} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import {PaymentsReportService} from '../../services/payments-report/payments-report.service';
import {PaymentsReportQuery} from '../../../../core/Payment/Application/Query/PaymentsReportQuery';
import {CreateAppResponse} from "../../../../core/common/Application/CreateAppResponse";

@ApiTags('Frontend')
@Controller('payment')
export class PaymentsReportController {
  constructor(@Inject() private service: PaymentsReportService) {}

  @Get('report')
  execute(
    @Query('start') start: string,
    @Query('end') end: string,
    @Query('page') page: number = 0,
    @Query('size') size: number = 10,
    @Query('method') method: string,
  ) {
    try {
      const query = new PaymentsReportQuery(page, size, start, end, method);
      const data =  this.service.execute(query);
      return CreateAppResponse.successResponse(
          'The report has been created',
          data
      )
    } catch (error) {
      return CreateAppResponse.errorResponse(error);
    }
  }
}
