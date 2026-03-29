import {Controller, Get, HttpException, HttpStatus, Inject, Query} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";
import {PaymentsReportService} from "../../services/payments-report/payments-report.service";
import {PaymentsReportQuery} from "../../../../core/Payment/Application/Query/PaymentsReportQuery";
@ApiTags('PaymentFrontend')
@Controller('payment')
export class PaymentsReportController {

    constructor(@Inject() private service: PaymentsReportService) {
    }

    @Get('report')
    execute(
        @Query('start') start: string,
        @Query('end') end: string,
        @Query('page') page: number = 0,
        @Query('size') size: number = 10,
        @Query('method') method: string,
        ) {
        try{
            const query = new PaymentsReportQuery(start,end,page,size,method);
            return this.service.execute(query);
        }catch(error){
            return new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }
}
