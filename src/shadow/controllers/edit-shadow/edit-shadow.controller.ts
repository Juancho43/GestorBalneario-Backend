import {Body, Controller, Inject, Put, UseGuards} from '@nestjs/common';
import {EditShadowService} from '../../services/edit-shadow/edit-shadow.service';
import {UpdateShadowCommand} from '../../../../core/Shadow/Application/Command/UpdateShadowCommand';
import {ApiHeader, ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {ShadowResponse} from '../../../../core/Shadow/Application/Response/ShadowResponse';
import {CurrentSeasonGuard} from '../../../guards/current-season.guard';
import {IController} from '../../../../core/common/Application/IController';
import {CreateAppResponse} from '../../../../core/common/Application/CreateAppResponse';

@ApiTags('Shadow')
@Controller('shadow')
export class EditShadowController implements IController {
  constructor(@Inject() private service: EditShadowService) {}
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
  @ApiOperation({ summary: 'Edit a shadow', description: 'Edits a shadow' })
  @ApiResponse({
    status: 200,
    description: 'The shadow has been updated.',
    type: ShadowResponse,
  })
  @ApiResponse({
    status: 500,
    description: 'The shadow has not been updated. Server Error',
  })
  async execute(@Body() request: UpdateShadowCommand) {
      const data = ShadowResponse.create(await this.service.execute(request));
      return CreateAppResponse.successResponse(
        'The shadow has been updated',
        data,
      );
  }
}
