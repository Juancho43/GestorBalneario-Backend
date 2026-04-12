import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Inject,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateShadowCommand } from '../../../../core/Shadow/Application/Command/CreateShadowCommand';
import { CreateShadowService } from '../../services/create-shadow/create-shadow.service';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ShadowResponse } from '../../../../core/Shadow/Application/Response/ShadowResponse';
import { CurrentSeasonGuard } from '../../../guards/current-season.guard';

@ApiTags('Shadow')
@Controller('shadow')
export class CreateShadowController {
  constructor(@Inject() private service: CreateShadowService) {}
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
    summary: 'Create a shadow',
    description: 'Creates new shadow',
  })
  @ApiResponse({
    status: 201,
    description: 'The shadow has been created.',
    type: ShadowResponse,
  })
  @ApiResponse({
    status: 500,
    description: 'The shadow has not been created. Server Error',
  })
  async execute(@Body() request: CreateShadowCommand) {
    try {
      return await this.service.execute(request);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
