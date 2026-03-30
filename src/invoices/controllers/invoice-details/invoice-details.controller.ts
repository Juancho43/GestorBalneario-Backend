import {Controller, Get, HttpException, HttpStatus, Inject, Param} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";
import {InvoiceDetailsService} from "../../services/invoice-details/invoice-details.service";
import {InvoiceDetailQuery} from "../../../../core/Invoice/Application/DTO/InvoiceDetailQuery";
@ApiTags('InvoiceFrontend')
@Controller('invoice')
export class InvoiceDetailsController {

    constructor(@Inject() private service: InvoiceDetailsService) {
    }

    @Get('detail/:id')
    execute(@Param('id') id: string) {
        try{
           return this.service.execute(new InvoiceDetailQuery(id));
        }catch (e) {
            return new HttpException(e.message, HttpStatus.BAD_REQUEST);
        }
    }
}

