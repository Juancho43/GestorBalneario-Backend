import { Controller, Delete, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Service')
@Controller('service')
export class DeleteServiceController {
  @Delete('delete/:id')
  execute(@Param('id') id: string) {}
}
