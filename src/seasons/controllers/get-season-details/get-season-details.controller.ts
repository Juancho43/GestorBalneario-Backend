import {Controller, Get, Inject, Param} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";
import {GetSeasonDetailsService} from "../../services/get-season-details/get-season-details.service";
import {IController} from "../../../../core/common/Application/IController";
import {CreateAppResponse} from "../../../../core/common/Application/CreateAppResponse";
import {GetByIdQuery} from "../../../../core/common/Application/GetByIdQuery";
@ApiTags('Frontend')
@Controller('seasons')
export class GetSeasonDetailsController implements IController{

    constructor(@Inject() private service: GetSeasonDetailsService ) {
    }

    @Get('details/:id')
    async execute(@Param('id') id: string){
        const data  = await this.service.execute(new GetByIdQuery(id));
        return CreateAppResponse.successResponse('The details have been retrieved successfully', data);
    }

}
