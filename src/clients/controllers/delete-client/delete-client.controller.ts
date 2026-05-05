import {Controller, Delete, HttpException, Inject, Param,} from '@nestjs/common';
import {DeleteClientService} from '../../services/delete-client/delete-client.service';
import {DeleteCommand} from '../../../../core/common/Application/DeleteCommand';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {IController} from "../../../../core/common/Application/IController";
import {CreateAppResponse} from "../../../../core/common/Application/CreateAppResponse";

@ApiTags('Client')
@Controller('client')
export class DeleteClientController implements IController{
  constructor(@Inject() private service: DeleteClientService) {}
  @Delete('delete/:id')
  @ApiOperation({
    summary: 'Delete a client',
    description: 'Delete a client by id',
  })
  @ApiResponse({ status: 204, description: 'The client has been deleted.' })
  @ApiResponse({
    status: 500,
    description: 'The client has not been deleted. Server Error',
  })
  async execute(@Param('id') request: string) {
      const command = new DeleteCommand(request);
      await this.service.execute(command);
      return CreateAppResponse.successResponse('The client has been deleted',204)
  }
}
