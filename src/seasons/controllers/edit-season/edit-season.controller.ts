import { Controller, Param, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Season')
@Controller('season')
export class EditSeasonController {
  @Put('update')
  execute(@Param('id') id: string) {}
}
