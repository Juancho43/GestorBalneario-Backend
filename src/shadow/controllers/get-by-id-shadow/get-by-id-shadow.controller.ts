import {Controller, Get, Inject, Param} from '@nestjs/common';
import {GetShadowService} from '../../services/get-shadow/get-shadow.service';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {CreateAppResponse} from '../../../../core/common/Application/CreateAppResponse';
import {IController} from '../../../../core/common/Application/IController';
import {ShadowResponse} from '../../../../core/Shadow/Application/Response/ShadowResponse';
import {GetByIdQuery} from '../../../../core/common/Application/GetByIdQuery';

@ApiTags('Shadow')
@Controller('shadow')
export class GetByIdShadowController implements IController {
  constructor(@Inject() private service: GetShadowService) {}
  @Get('get/:id')
  @ApiOperation({
    summary: 'Get shadow',
    description: 'Gets a shadow by its id.',
  })
  @ApiResponse({ status: 200, description: 'The shadow has been retrieved.' })
  @ApiResponse({
    status: 500,
    description: 'The shadow has not been retrieved.',
  })
  async execute(@Param('id') id: string) {
      const query = new GetByIdQuery(id);
      const data = ShadowResponse.create(await this.service.execute(query));
      return CreateAppResponse.successResponse(
        'Tha shadow has been retrieved',
        data,
      );
  }
}
