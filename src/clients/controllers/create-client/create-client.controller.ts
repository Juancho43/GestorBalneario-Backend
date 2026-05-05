import {Body, Controller, Inject, Post,} from '@nestjs/common';
import {CreateClientService} from '../../services/create-client/create-client.service';
import {CreateClientCommand} from '../../../../core/Client/Application/Commands/CreateClientCommand';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {ClientResponse} from '../../../../core/Client/Application/DTO/ClientResponse';
import {IController} from '../../../../core/common/Application/IController';
import {CreateAppResponse} from '../../../../core/common/Application/CreateAppResponse';

@ApiTags('Client')
@Controller('client')
export class CreateClientController implements IController {
  constructor(@Inject() private service: CreateClientService) {}
  @Post('create')
  @ApiOperation({
    summary: 'Create a client',
    description: 'Creates new client',
  })
  @ApiResponse({
    status: 201,
    description: 'The client has been created.',
    type: ClientResponse,
  })
  @ApiResponse({
    status: 500,
    description: 'The client has not been created. Server Error',
  })
  async execute(@Body() request: CreateClientCommand) {
      const data =ClientResponse.create(await this.service.execute(request));
      return CreateAppResponse.successResponse(
        'Tha client has been created',
        data,
        201,
      );
  }
}
