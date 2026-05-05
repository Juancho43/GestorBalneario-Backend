import {Body, Controller, Inject, Put, UseGuards} from '@nestjs/common';
import {ApiHeader, ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {IController} from '../../../../core/common/Application/IController';
import {UpdateServiceService} from '../../service/update-service/update-service.service';
import {UpdateServiceCommand} from '../../../../core/Service/Application/Commands/UpdateServiceCommand';
import {CreateAppResponse} from '../../../../core/common/Application/CreateAppResponse';
import {ServiceResponse} from '../../../../core/Service/Application/DTO/ServiceResponse';
import {CurrentSeasonGuard} from '../../../guards/current-season.guard';

@ApiTags('Service')
@Controller('service')
export class EditServiceController implements IController {
  constructor(@Inject() private service: UpdateServiceService) {}
  @Put('update')
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
  @ApiOperation({ summary: 'Edit a service', description: 'Edits a shadow' })
  @ApiResponse({
    status: 200,
    description: 'The service has been updated.',
    type: ServiceResponse,
  })
  @ApiResponse({
    status: 500,
    description: 'The service has not been updated. Server Error',
  })
  async execute(@Body() request: UpdateServiceCommand) {
      const data = await this.service.execute(request);
      return CreateAppResponse.successResponse(
        'The service has been updated',
        data,
      );
  }
}
