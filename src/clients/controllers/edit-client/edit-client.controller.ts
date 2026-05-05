import {Body, Controller, Inject, Put,} from '@nestjs/common';
import {EditClientService} from '../../services/edit-client/edit-client.service';
import {UpdateClientCommand} from '../../../../core/Client/Application/Commands/UpdateClientCommand';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {ClientResponse} from '../../../../core/Client/Application/DTO/ClientResponse';
import {CreateAppResponse} from "../../../../core/common/Application/CreateAppResponse";
import {IController} from "../../../../core/common/Application/IController";

@ApiTags('Client')
@Controller('client')
export class EditClientController implements IController {
  constructor(@Inject() private readonly service: EditClientService) {}

  @Put('update')
  @ApiOperation({ summary: 'Edit a client', description: 'Edits a client' })
  @ApiResponse({
    status: 200,
    description: 'The client has been updated.',
    type: ClientResponse,
  })
  @ApiResponse({
    status: 500,
    description: 'The client has not been updated. Server Error',
  })
  async execute(@Body() request: UpdateClientCommand) {
      const data = ClientResponse.create(await this.service.execute(request));
      return CreateAppResponse.successResponse(
          'The client has been updated successfully.',
          data,
          201
      )
  }
}
