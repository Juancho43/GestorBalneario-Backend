import {Body, Controller, Inject, Put} from '@nestjs/common';
import {IController} from "../../../../core/common/Application/IController";
import {AppResponse} from "../../../../core/common/Application/AppResponse";
import {CreateAppResponse} from "../../../../core/common/Application/CreateAppResponse";
import {DeleteInvoiceItemCommand} from "../../../../core/Invoice/Application/Commands/DeleteInvoiceItemCommand";
import {DeleteInvoiceItemService} from "../../services/delete-invoice-item/delete-invoice-item.service";

@Controller('invoice/item')
export class DeleteInvoiceItemController implements IController {

    constructor(@Inject() private service: DeleteInvoiceItemService) {
    }

    @Put('remove')
    async execute(@Body() command: DeleteInvoiceItemCommand): Promise<AppResponse> {
        await this.service.execute(command);
        return CreateAppResponse.successResponse('Invoice item removed successfully',undefined)
    }
}
