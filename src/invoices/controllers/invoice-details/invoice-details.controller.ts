import {Controller, Get, HttpException, HttpStatus, Inject, Param,} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import {InvoiceDetailsService} from '../../services/invoice-details/invoice-details.service';
import {InvoiceDetailQuery} from '../../../../core/Invoice/Application/Queries/InvoiceDetailQuery';
import {CreateAppResponse} from "../../../../core/common/Application/CreateAppResponse";
import {IController} from "../../../../core/common/Application/IController";

@ApiTags('Frontend')
@Controller('invoice')
export class InvoiceDetailsController implements IController {
  constructor(@Inject() private service: InvoiceDetailsService) {}

  @Get('detail/:id')
  async execute(@Param('id') id: string) {
      const data = await this.service.execute(new InvoiceDetailQuery(id));
      return CreateAppResponse.successResponse(
          'The invoice details are retrieved successfully',
          data
      )
  }
}
