import {Body, Controller, Inject, Post, UseGuards} from '@nestjs/common';
import {ApiHeader, ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {CreateServiceCommand} from '../../../../core/Service/Application/Commands/CreateServiceCommand';
import {CreateServiceService} from '../../service/create-service/create-service.service';
import {ServiceResponse} from '../../../../core/Service/Application/DTO/ServiceResponse';
import {CurrentSeasonGuard} from '../../../guards/current-season.guard';
import {IController} from '../../../../core/common/Application/IController';
import {CreateAppResponse} from '../../../../core/common/Application/CreateAppResponse';

@ApiTags('Service')
@Controller('service')
export class CreateServiceController implements IController {
  constructor(@Inject() private service: CreateServiceService) {}
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
    summary: 'Create a service',
    description: 'Creates new service',
  })
  @ApiResponse({
    status: 201,
    description: 'The service has been created.',
    type: ServiceResponse,
  })
  @ApiResponse({
    status: 500,
    description: 'The service has not been created. Server Error',
  })
  async execute(@Body() request: CreateServiceCommand) {
      const data = ServiceResponse.create(await this.service.execute(request));
      return CreateAppResponse.successResponse(
        'The service has been created',
        data,
        201,
      );
  }
}
