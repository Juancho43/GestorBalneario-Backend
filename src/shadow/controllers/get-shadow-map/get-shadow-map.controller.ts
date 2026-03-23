import {Controller, Get, Inject} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";
import {GetShadowMapService} from "../../services/get-shadow-map/get-shadow-map.service";
@ApiTags('ShadowFronted')
@Controller('shadow')
export class GetShadowMapController {
    constructor(@Inject() private service:GetShadowMapService) {
    }
    @Get('map')
    async get(){
        return await this.service.execute();
    }
}
