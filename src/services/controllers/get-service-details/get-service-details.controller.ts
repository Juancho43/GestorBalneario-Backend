import {Controller, Get, Inject, Param} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";
import {GetByIdQuery} from "../../../../core/common/Application/GetByIdQuery";
import {CreateAppResponse} from "../../../../core/common/Application/CreateAppResponse";
import {GetServiceDetailsService} from "../../service/get-service-details/get-service-details.service";
import {IController} from "../../../../core/common/Application/IController";

@ApiTags('Frontend')
@Controller('services')
export class GetServiceDetailsController implements IController{
    constructor(@Inject() private service: GetServiceDetailsService) {
    }

    @Get('details/:id')
    async execute(@Param('id') id: string){
        const data  = await this.service.execute(new GetByIdQuery(id));
        return CreateAppResponse.successResponse('The details have been retrieved successfully', data);
    }
}
