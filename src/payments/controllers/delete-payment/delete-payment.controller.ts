import { Controller, Delete, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Payment')
@Controller('payment')
export class DeletePaymentController {
  @Delete('delete/:id')
  execute(@Param('id') id: string) {}
}
