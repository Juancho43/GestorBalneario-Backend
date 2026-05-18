import {Body, Controller, Inject, Put} from '@nestjs/common';
import {IController} from "../../../../core/common/Application/IController";
import {AppResponse} from "../../../../core/common/Application/AppResponse";
import {CreateAppResponse} from "../../../../core/common/Application/CreateAppResponse";
import {PutInvoiceItemService} from "../../services/put-invoice-item/put-invoice-item.service";
import {UpdateInvoiceItemCommand} from "../../../../core/Invoice/Application/Commands/UpdateInvoiceItemCommand";

@Controller('invoice/item')
export class PutInvoiceItemController implements IController {

    constructor(@Inject() private service: PutInvoiceItemService) {
    }

    @Put('update')
    async execute(@Body() command: UpdateInvoiceItemCommand): Promise<AppResponse> {
        await this.service.execute(command);
        return CreateAppResponse.successResponse('Invoice item updated succesfully',undefined)
    }
}
