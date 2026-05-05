import {Controller, Delete, Inject, Param} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {IController} from '../../../../core/common/Application/IController';
import {DeleteCommand} from '../../../../core/common/Application/DeleteCommand';
import {CreateAppResponse} from '../../../../core/common/Application/CreateAppResponse';
import {DeleteInvoiceService} from '../../services/delete-service/delete-invoice.service';

@ApiTags('Invoice')
@Controller('invoice')
export class DeleteInvoiceController implements IController {
  constructor(@Inject() private service: DeleteInvoiceService) {}
  @Delete('delete/:id')
  @ApiOperation({
    summary: 'Delete a invoice',
    description: 'Delete a invoice by id',
  })
  @ApiResponse({ status: 204, description: 'The invoice has been deleted.' })
  @ApiResponse({
    status: 500,
    description: 'The invoice has not been deleted. Server Error',
  })
  async execute(@Param('id') request: string) {
      const data = await this.service.execute(new DeleteCommand(request));
      return CreateAppResponse.successResponse(
        'The invoice has been deleted',
        data,
        204,
      );
  }
}
