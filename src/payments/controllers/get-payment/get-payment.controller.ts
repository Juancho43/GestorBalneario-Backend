import {Controller, Get, Param,} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {PaymentResponse} from '../../../../core/Payment/Application/DTO/PaymentResponse';
import {CreateAppResponse} from "../../../../core/common/Application/CreateAppResponse";
import {IController} from "../../../../core/common/Application/IController";

@ApiTags('Payment')
@Controller('payment')
export class GetPaymentController implements IController{
  @Get('get/:id')
  @ApiOperation({
    summary: 'Get payment',
    description: 'Gets a payment by its id.',
  })
  @ApiResponse({
    status: 200,
    description: 'The payment has been retrieved.',
    type: PaymentResponse,
  })
  @ApiResponse({
    status: 500,
    description: 'The payment has not been retrieved.',
  })
  async execute(@Param('id') id: string) {
      const data = null//await this.service.execute(query);
      return CreateAppResponse.successResponse(
          'The payment has been retrieved',
          data
      )
  }
}
