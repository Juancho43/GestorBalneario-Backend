import {Controller, Get, HttpException, HttpStatus, Inject, Param} from '@nestjs/common';
import {InvoiceResponse} from "../../../../core/Invoice/Application/DTO/InvoiceResponse";
import {ApiTags, ApiResponse, ApiOperation} from "@nestjs/swagger";
import {GetInvoiceService} from "../../services/get-invoice/get-invoice.service";
@ApiTags('Invoice')
@Controller('invoice')
export class GetInvoiceController {
    constructor(@Inject() private service: GetInvoiceService) {
    }
    @Get('get/:id')
    @ApiOperation({summary: 'Gets a invoice', description: 'Gets a invoice by id' })
    @ApiResponse({status: 200, description: 'The invoice has been retrieved.', type: InvoiceResponse})
    @ApiResponse({status: 500, description: 'The invoice has not been retrieved. Server Error'})
    async execute(@Param('id') id: string) {
        try {
            return await this.service.execute(id);
        }catch (error) {
            return new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }
}
