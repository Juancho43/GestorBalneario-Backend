import {Controller, Get, Inject, Param,} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {InvoiceDetailsService} from '../../services/invoice-details/invoice-details.service';
import {InvoiceDetailQuery} from '../../../../core/Invoice/Application/Queries/InvoiceDetailQuery';
import {CreateAppResponse} from "../../../../core/common/Application/CreateAppResponse";
import {IController} from "../../../../core/common/Application/IController";
import {ClientDetailsDTO} from "../../../../core/Client/Application/DTO/ClientDetailsDTO";

@ApiTags('Frontend')
@Controller('invoice')
export class InvoiceDetailsController implements IController {
  constructor(@Inject() private service: InvoiceDetailsService) {}
    @ApiOperation({
        summary: 'Gets an invoice details',
        description: 'Gets an invoice by id with its items, client and payments.',
    })
    @ApiResponse({
        status: 200,
        description: 'The invoice details has been retrieved.',
    })
    @ApiResponse({
        status: 500,
        description: 'The invoice details has not been retrieved. Server Error',
    })
  @Get('detail/:id')
  async execute(@Param('id') id: string) {
      const data = await this.service.execute(new InvoiceDetailQuery(id));
      return CreateAppResponse.successResponse(
          'The invoice details are retrieved successfully',
          data
      )
  }
}
