import {Controller, Get, Inject} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";
import {AppResponse} from "../../../../core/common/Application/AppResponse";
import {CreateAppResponse} from "../../../../core/common/Application/CreateAppResponse";
import {GetServiceTypesService} from "../../service/get-service-types/get-service-types.service";
import {IController} from "../../../../core/common/Application/IController";
@ApiTags('Frontend')
@Controller('service')
export class GetServiceTypesController implements IController {
    constructor(@Inject() private service: GetServiceTypesService) {
    }

    @Get('types')
    async execute(): Promise<AppResponse<string[]>> {
        const data = await this.service.execute();
        return CreateAppResponse.successResponse('Service types retrieved successfully', data);
    }
}
