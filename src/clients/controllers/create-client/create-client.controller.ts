import {Body, Controller, Inject, Post} from '@nestjs/common';
import {CreateClientService} from "../../services/create-client/create-client.service";
import {CreateClientCommand} from "../../../../core/Client/Application/DTO/CreateClientCommand";
import {ApiTags} from "@nestjs/swagger";

@ApiTags('Client')
@Controller('client')
export class CreateClientController {
    constructor(@Inject() private service: CreateClientService) {
    }
    @Post('create')
    async createShadow(@Body()request: CreateClientCommand) {
        return await this.service.execute(request);
    }
}
