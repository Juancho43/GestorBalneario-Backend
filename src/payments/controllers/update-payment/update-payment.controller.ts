import {Body, Controller, HttpException, HttpStatus, Put} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {PaymentResponse} from "../../../../core/Payment/Application/DTO/PaymentResponse";
import {UpdatePaymentCommand} from "../../../../core/Payment/Application/DTO/UpdatePaymentCommand";

@ApiTags('Payment')
@Controller('update-payment')
export class UpdatePaymentController {
    @Put('update')
    @ApiOperation({summary: 'Edit a payment', description: 'Edits a payment' })
    @ApiResponse({status: 200, description: 'The payment has been updated.', type: PaymentResponse})
    @ApiResponse({status: 500, description: 'The payment has not been updated. Server Error'})
    async execute(@Body()request: UpdatePaymentCommand) {
        try {
            // return await this.service.execute(request);
        }catch (error) {
            return new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }
}
