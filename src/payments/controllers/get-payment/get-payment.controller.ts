import {Controller, Get, HttpException, HttpStatus, Param} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {PaymentResponse} from "../../../../core/Payment/Application/DTO/PaymentResponse";

@ApiTags('Payment')
@Controller('payment')
export class GetPaymentController {
    @Get('get/:id')
    @ApiOperation({summary: 'Get payment', description: 'Gets a payment by its id.'})
    @ApiResponse({status: 200, description: 'The payment has been retrieved.', type: PaymentResponse})
    @ApiResponse({status: 500, description: 'The payment has not been retrieved.'})
    async execute(@Param('id') id: string) {
        try {
            // const query = new GetReservationQuery(id);
            // return await this.service.execute(query);
        } catch (error) {
            return new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }
}