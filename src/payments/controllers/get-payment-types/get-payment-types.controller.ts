import {Controller, Get, Inject} from '@nestjs/common';
import {GetPaymentTypesService} from "../../services/get-payment-types/get-payment-types.service";
import {ApiTags} from "@nestjs/swagger";
import {IController} from "../../../../core/common/Application/IController";
import {AppResponse} from "core/common/Application/AppResponse";
import {CreateAppResponse} from "../../../../core/common/Application/CreateAppResponse";

@ApiTags('Frontend')
@Controller('payment')
export class GetPaymentTypesController implements IController {

    constructor(@Inject() private service: GetPaymentTypesService) {
    }

    @Get('methods')
    async execute(): Promise<AppResponse<string[]>> {
        const data = await this.service.execute();
        return CreateAppResponse.successResponse('Payment types retrieved successfully', data);
    }
}
