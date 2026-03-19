import {Body, Controller, HttpException, HttpStatus, Post} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {CreatePaymentCommand} from "../../../../core/Payment/Application/DTO/CreatePaymentCommand";
import {PaymentResponse} from "../../../../core/Payment/Application/DTO/PaymentResponse";
@ApiTags('Payment')
@Controller('payment')
export class CreatePaymentController {
    @Post('create')

    @ApiOperation({summary: 'Create a payment', description: 'Creates a new payment' })
    @ApiResponse({
        status: 201,
        description: 'The payment has been created.',
        type: PaymentResponse
    })
    @ApiResponse({status: 500, description: 'The payment has not been created.'})
    async execute(@Body() request: CreatePaymentCommand) {
        try {
            // return await this.service.execute(request);
        } catch (error) {
            return new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }
}