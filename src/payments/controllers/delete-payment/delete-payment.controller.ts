import {Controller, Delete, Param} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {IController} from '../../../../core/common/Application/IController';
import {CreateAppResponse} from '../../../../core/common/Application/CreateAppResponse';

@ApiTags('Payment')
@Controller('payment')
export class DeletePaymentController implements IController {
  @Delete('delete/:id')
  @ApiOperation({
    summary: 'Delete a payment',
    description: 'Delete a payment by id',
  })
  @ApiResponse({ status: 204, description: 'The payment has been deleted.' })
  @ApiResponse({
    status: 500,
    description: 'The payment has not been deleted. Server Error',
  })
  async execute(@Param('id') request: string) {
      // const data = await this.service.execute(new DeleteCommand(request));
      const data = null;
      return CreateAppResponse.successResponse(
        'The payment has been deleted',
        data,
        204,
      );
  }
}
