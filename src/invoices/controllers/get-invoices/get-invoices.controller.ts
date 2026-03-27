import {Controller, Get, HttpException, HttpStatus, Inject, Query} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {GetInvoicesService} from "../../services/get-invoices/get-invoices.service";
@ApiTags('Invoice')
@Controller('invoice')
export class GetInvoicesController {
    constructor(@Inject() private service: GetInvoicesService) {
    }

    @Get('current')
    @ApiOperation({summary: 'Gets invoices', description: 'Gets a list of current invoices.'})
    @ApiResponse({status: 200, description: 'The invoices has been retrieved.'})
    @ApiResponse({status: 500, description: 'The invoices has not been retrieved.'})
    async execute(@Query('page') page: number = 1, @Query('size') size: number = 10) {
        try {
            return await this.service.execute(null);
        } catch (e) {
            return new HttpException(e.message, HttpStatus.BAD_REQUEST);
        }
    }
}