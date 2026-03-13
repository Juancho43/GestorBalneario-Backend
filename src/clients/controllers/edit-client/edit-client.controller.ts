import {Body, Controller, Inject, Put} from '@nestjs/common';
import {EditClientService} from "../../services/edit-client/edit-client.service";
import {UpdateClientCommand} from "../../../../core/Client/Application/DTO/UpdateClientCommand";

@Controller('client')
export class EditClientController {
    constructor(@Inject() private readonly service: EditClientService) {
    }

    @Put('update')
    async createShadow(@Body()request: UpdateClientCommand) {
        return await this.service.execute(request);
    }


}

