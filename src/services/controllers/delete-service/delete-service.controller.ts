import {Controller, Delete, Inject, Param} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {IController} from '../../../../core/common/Application/IController';
import {DeleteCommand} from '../../../../core/common/Application/DeleteCommand';
import {CreateAppResponse} from '../../../../core/common/Application/CreateAppResponse';
import {DeleteServiceService} from '../../service/delete-service/delete-service.service';

@ApiTags('Service')
@Controller('service')
export class DeleteServiceController implements IController {
  constructor(@Inject() private service: DeleteServiceService) {}
  @Delete('delete/:id')
  @ApiOperation({
    summary: 'Delete a service',
    description: 'Delete a service by id',
  })
  @ApiResponse({ status: 204, description: 'The service has been deleted.' })
  @ApiResponse({
    status: 500,
    description: 'The service has not been deleted. Server Error',
  })
  async execute(@Param('id') request: string) {
      const data = await this.service.execute(new DeleteCommand(request));
      return CreateAppResponse.successResponse(
        'The service has been deleted',
        data,
        204,
      );
  }
}
