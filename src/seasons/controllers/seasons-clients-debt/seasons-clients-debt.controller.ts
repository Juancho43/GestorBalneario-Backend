import {Controller, Get, Inject, Query} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";
import {SeasonsClientsDebtService} from "../../services/seasons-clients-debt/seasons-clients-debt.service";
import {GetSeasonQuery} from "../../../../core/Season/Application/Queries/GetSeasonQuery";
import {CreateAppResponse} from "../../../../core/common/Application/CreateAppResponse";
import {IController} from "../../../../core/common/Application/IController";
@ApiTags('Frontend')
@Controller('season')
export class SeasonsClientsDebtController implements IController{

    constructor(@Inject() private service: SeasonsClientsDebtService) {
    }

    @Get('clients-debt')
    async execute(@Query('seasonId') id: string){
        const data = await this.service.execute(new GetSeasonQuery(id));
        return CreateAppResponse.successResponse('The global clients debt calculated successfully', data);
    }
}
