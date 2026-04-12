import {
  Controller,
  Delete,
  HttpException,
  Inject,
  Param,
} from '@nestjs/common';
import { DeleteClientService } from '../../services/delete-client/delete-client.service';
import { DeleteCommand } from '../../../../core/common/Application/DeleteCommand';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Client')
@Controller('client')
export class DeleteClientController {
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
    try {
      const command = new DeleteCommand(request);
      return await this.service.execute(command);
    } catch (error) {
      return new HttpException(error.message, 500);
    }
  }
}
