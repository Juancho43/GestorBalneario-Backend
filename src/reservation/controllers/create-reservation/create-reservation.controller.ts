import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Inject,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateReservationService } from '../../services/create-reservation/create-reservation.service';
import { CreateReservationCommand } from '../../../../core/Reservation/Application/Commands/CreateReservationCommand';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ReservationResponse } from '../../../../core/Reservation/Application/DTO/ReservationResponse';
import { CurrentSeasonGuard } from '../../../guards/current-season.guard';
@ApiTags('Reservation')
@Controller('reservation')
export class CreateReservationController {
  constructor(@Inject() private service: CreateReservationService) {}
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
    summary: 'Create a reservation',
    description: 'Creates a new reservation',
  })
  @ApiResponse({
    status: 201,
    description: 'The reservation has been created.',
    type: ReservationResponse,
  })
  @ApiResponse({
    status: 500,
    description: 'The reservation has not been created.',
  })
  async execute(@Body() request: CreateReservationCommand) {
    try {
      return await this.service.execute(request);
    } catch (error) {
      return new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
