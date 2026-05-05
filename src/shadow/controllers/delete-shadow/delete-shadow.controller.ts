import {Controller, Delete, Inject, Param} from '@nestjs/common';
import {DeleteShadowService} from '../../services/delete-shadow/delete-shadow.service';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {DeleteCommand} from '../../../../core/common/Application/DeleteCommand';
import {IController} from '../../../../core/common/Application/IController';
import {CreateAppResponse} from '../../../../core/common/Application/CreateAppResponse';

@ApiTags('Shadow')
@Controller('shadow')
export class DeleteShadowController implements IController {
  constructor(@Inject() private service: DeleteShadowService) {}
  @Delete('delete/:id')
  @ApiOperation({
    summary: 'Delete a shadow',
    description: 'Delete a shadow by id',
  })
  @ApiResponse({ status: 204, description: 'The shadow has been deleted.' })
  @ApiResponse({
    status: 500,
    description: 'The shadow has not been deleted. Server Error',
  })
  async execute(@Param('id') request: string) {
      const data = await this.service.execute(new DeleteCommand(request));
      return CreateAppResponse.successResponse(
        'The shadow has been deleted',
        data,
        204,
      );
  }
}
