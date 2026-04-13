import {
  Controller,
  Get,
  Inject,
  Param,
} from '@nestjs/common';
import { GetClientService } from '../../services/get-client/get-client.service';
import { GetClientQuery } from '../../../../core/Client/Application/Queries/GetClientQuery';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ClientResponse } from '../../../../core/Client/Application/DTO/ClientResponse';
import {IController} from "../../../../core/common/Application/IController";
import { AppResponse } from "core/common/Application/AppResponse";
import {CreateAppResponse} from "../../../../core/common/Application/CreateAppResponse";

@ApiTags('Client')
@Controller('client')
export class GetClientController implements IController {
  constructor(@Inject() private service: GetClientService) {
  }

  @Get('get/:id')
  @ApiOperation({
    summary: 'Gets a client',
    description: 'Gets a client by id',
  })
  @ApiResponse({
    status: 200,
    description: 'The client has been retrieved.',
    type: ClientResponse,
  })
  @ApiResponse({
    status: 500,
    description: 'The client has not been retrieved. Server Error',
  })

  async execute(@Param('id') id: string): Promise<AppResponse> {
    try {
      const data = await this.service.execute( new GetClientQuery(id));
      return  CreateAppResponse.successResponse('The client has been retrieved',data);
    } catch (error) {
      return CreateAppResponse.errorResponse(error)
    }
  }
}
