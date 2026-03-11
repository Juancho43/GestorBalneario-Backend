import {Body, Controller, Get, Inject, Param} from '@nestjs/common';
import {GetShadowByIdQuery} from "../../../../core/Shadow/Application/DTO/GetShadowByIdQuery";
import {GetShadowService} from "../../services/get-shadow/get-shadow.service";

@Controller('shadow')
export class GetByIdShadowController {

    constructor(@Inject() private service: GetShadowService) {
    }
    @Get('get/:id')
    async createShadow(@Param('id') id: string) {
        const query = new GetShadowByIdQuery(id);
        return await this.service.execute(query);

    }

}
