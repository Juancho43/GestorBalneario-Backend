import {Controller, Get, Inject, Param} from '@nestjs/common';
import {InvoiceResponse} from '../../../../core/Invoice/Application/DTO/InvoiceResponse';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {GetInvoiceService} from '../../services/get-invoice/get-invoice.service';
import {GetByIdQuery} from '../../../../core/common/Application/GetByIdQuery';
import {IController} from '../../../../core/common/Application/IController';
import {CreateAppResponse} from '../../../../core/common/Application/CreateAppResponse';

@ApiTags('Invoice')
@Controller('invoice')
export class GetInvoiceController implements IController {
  constructor(@Inject() private service: GetInvoiceService) {}
  @Get('get/:id')
  @ApiOperation({
    summary: 'Gets a invoice',
    description: 'Gets a invoice by id',
  })
  @ApiResponse({
    status: 200,
    description: 'The invoice has been retrieved.',
    type: InvoiceResponse,
  })
  @ApiResponse({
    status: 500,
    description: 'The invoice has not been retrieved. Server Error',
  })
  async execute(@Param('id') id: string) {
      const data = await this.service.execute(new GetByIdQuery(id));
      return CreateAppResponse.successResponse(
        'Tha invoice has been retrieved',
        data,
      );
  }
}
