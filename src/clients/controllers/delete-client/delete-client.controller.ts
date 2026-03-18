import {Controller, Delete, Inject, Param} from '@nestjs/common';
import {DeleteClientService} from "../../services/delete-client/delete-client.service";
import {DeleteClientCommand} from "../../../../core/Client/Application/DTO/DeleteClientCommand";
import {ApiTags} from "@nestjs/swagger";

@ApiTags('Client')
@Controller('client')
export class DeleteClientController {
    constructor(@Inject() private service: DeleteClientService) {

    }
    @Delete('delete/:id')
    async createShadow(@Param('id') request) {
        const command = new DeleteClientCommand(request);
        return await this.service.execute(command);
    }
}
