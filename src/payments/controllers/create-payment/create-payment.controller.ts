import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Inject,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePaymentCommand } from '../../../../core/Payment/Application/Command/CreatePaymentCommand';
import { PaymentResponse } from '../../../../core/Payment/Application/DTO/PaymentResponse';
import { CreatePaymentService } from '../../services/create-payment/create-payment.service';
import { CurrentSeasonGuard } from '../../../guards/current-season.guard';
@ApiTags('Payment')
@Controller('payment')
export class CreatePaymentController {
  constructor(@Inject() private service: CreatePaymentService) {}
  @Post('create')
  @UseGuards(CurrentSeasonGuard)
  @ApiHeader({
    name: 'x-season', // El nombre exacto que espera su Guard
    description: 'ID de la temporada actual para procesar la petición',
    required: true, // Esto hace que aparezca con el asterisco rojo en Swagger
    schema: {
      type: 'string',
      example: 'ab02c0fd-cfa8-4c5c-80dc-7ccfaa38f8dc', // Ayude al usuario con un ejemplo
    },
  })
  @ApiOperation({
    summary: 'Create a payment',
    description: 'Creates a new payment',
  })
  @ApiResponse({
    status: 201,
    description: 'The payment has been created.',
    type: PaymentResponse,
  })
  @ApiResponse({
    status: 500,
    description: 'The payment has not been created.',
  })
  async execute(@Body() request: CreatePaymentCommand) {
    try {
      return await this.service.execute(request);
    } catch (error) {
      return new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
