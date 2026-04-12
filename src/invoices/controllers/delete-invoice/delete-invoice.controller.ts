import { Controller, Delete, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Invoice')
@Controller('invoice')
export class DeleteInvoiceController {
  @Delete('delete/:id')
  execute(@Param('id') id: string) {}
}
