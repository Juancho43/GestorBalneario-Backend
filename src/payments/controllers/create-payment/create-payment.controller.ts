import {Body, Controller, Inject, Post, UseGuards,} from '@nestjs/common';
import {ApiHeader, ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {CreatePaymentCommand} from '../../../../core/Payment/Application/Command/CreatePaymentCommand';
import {PaymentResponse} from '../../../../core/Payment/Application/DTO/PaymentResponse';
import {CreatePaymentService} from '../../services/create-payment/create-payment.service';
import {CurrentSeasonGuard} from '../../../guards/current-season.guard';
import {CreateAppResponse} from '../../../../core/common/Application/CreateAppResponse';
import {IController} from '../../../../core/common/Application/IController';

@ApiTags('Payment')
@Controller('payment')
export class CreatePaymentController implements IController {
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
      const data =PaymentResponse.create( await this.service.execute(request));
      return CreateAppResponse.successResponse(
        'Tha payment has been created',
        data,
        201,
      );
  }
}
