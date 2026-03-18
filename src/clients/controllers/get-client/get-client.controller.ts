import {Controller, Get, Inject, Param} from '@nestjs/common';
import {GetClientService} from "../../services/get-client/get-client.service";
import {GetClientQuery} from "../../../../core/Client/Application/DTO/GetClientQuery";
import {ApiTags} from "@nestjs/swagger";

@ApiTags('Client')
@Controller('client')
export class GetClientController {
    constructor(@Inject() private service: GetClientService) {
    }
    @Get('get/:id')
    async createShadow(@Param('id') id: string) {
        const query = new GetClientQuery(id);
        return await this.service.execute(query);

    }
}



