import { Controller, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Service')
@Controller('service')
export class EditServiceController {
  @Put('update')
  execute() {}
}
