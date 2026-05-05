import {Controller, Get, Inject, Param} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {ServiceResponse} from '../../../../core/Service/Application/DTO/ServiceResponse';
import {GetServiceService} from '../../service/get-service/get-service.service';
import {CreateAppResponse} from '../../../../core/common/Application/CreateAppResponse';
import {IController} from '../../../../core/common/Application/IController';
import {GetByIdQuery} from '../../../../core/common/Application/GetByIdQuery';

@ApiTags('Service')
@Controller('service')
export class GetServiceController implements IController {
  constructor(@Inject() private service: GetServiceService) {}

  @Get('get/:id')
  @ApiOperation({
    summary: 'Get service',
    description: 'Gets a service by its id.',
  })
  @ApiResponse({
    status: 200,
    description: 'The service has been retrieved.',
    type: ServiceResponse,
  })
  @ApiResponse({
    status: 500,
    description: 'The service has not been retrieved.',
  })
  async execute(@Param('id') id: string) {
      const data = ServiceResponse.create(
        await this.service.execute(new GetByIdQuery(id)),
      );
      return CreateAppResponse.successResponse(
        'The service has been retrieved',
        data,
      );
  }
}
