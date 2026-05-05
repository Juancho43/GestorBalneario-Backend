import {Controller, Delete, Inject, Param} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {IController} from '../../../../core/common/Application/IController';
import {CreateAppResponse} from '../../../../core/common/Application/CreateAppResponse';
import {DeleteSeasonService} from '../../services/delete-season/delete-season.service';
import {DeleteCommand} from '../../../../core/common/Application/DeleteCommand';

@ApiTags('Season')
@Controller('season')
export class DeleteSeasonController implements IController {
  constructor(@Inject() private service: DeleteSeasonService) {}
  @Delete('delete/:id')
  @ApiOperation({
    summary: 'Delete a season',
    description: 'Delete a season by id',
  })
  @ApiResponse({ status: 204, description: 'The season has been deleted.' })
  @ApiResponse({
    status: 500,
    description: 'The season has not been deleted. Server Error',
  })
  async execute(@Param('id') id: string) {
      await this.service.execute(new DeleteCommand(id));
      return CreateAppResponse.successResponse(
        'The season has been delete successfully',
        null,
      );
  }
}
