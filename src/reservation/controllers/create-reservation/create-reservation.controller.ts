import {Body, Controller, Inject, Post, UseGuards,} from '@nestjs/common';
import {CreateReservationService} from '../../services/create-reservation/create-reservation.service';
import {CreateReservationCommand} from '../../../../core/Reservation/Application/Commands/CreateReservationCommand';
import {ApiHeader, ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {ReservationResponse} from '../../../../core/Reservation/Application/DTO/ReservationResponse';
import {CurrentSeasonGuard} from '../../../guards/current-season.guard';
import {CreateAppResponse} from '../../../../core/common/Application/CreateAppResponse';
import {IController} from "../../../../core/common/Application/IController";

@ApiTags('Reservation')
@Controller('reservation')
export class CreateReservationController implements IController {
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
      const data = ReservationResponse.create(
        await this.service.execute(request),
      );
      return CreateAppResponse.successResponse(
        'Tha reservation has been created',
        data,
        201,
      );
  }
}
