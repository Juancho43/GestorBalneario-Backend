import {
  Controller,
  Delete,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Season')
@Controller('season')
export class DeleteSeasonController {
  @Delete('delete/:id')
  execute(@Param('id') id: string) {
    try {
      // return this.service.execute(new DeleteSeasonCommand(id));
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
