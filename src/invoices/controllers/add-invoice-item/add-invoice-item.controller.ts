import {Body, Controller, Inject, Post} from '@nestjs/common';
import {IController} from "../../../../core/common/Application/IController";
import {AppResponse} from "core/common/Application/AppResponse";
import {AddInvoiceItemCommand} from "../../../../core/Invoice/Application/Commands/AddInvoiceItemCommand";
import {AddInvoiceItemService} from "../../../events/services/add-invoice-item/add-invoice-item.service";
import {CreateAppResponse} from "../../../../core/common/Application/CreateAppResponse";

@Controller('invoice/item')
export class AddInvoiceItemController implements IController {

    constructor(@Inject() private service: AddInvoiceItemService) {
    }

    @Post('add')
    async execute(@Body() command: AddInvoiceItemCommand): Promise<AppResponse> {
        await this.service.execute(command);
        return CreateAppResponse.successResponse('Invoice item added successfully',undefined)
    }
}
