import {Body, Controller, Delete, Inject, Param} from '@nestjs/common';
import {DeleteShadowService} from "../../services/delete-shadow/delete-shadow.service";
import {DeleteShadowCommand} from "../../../../core/Shadow/Application/DTO/DeleteShadowCommand";

@Controller('shadow')
export class DeleteShadowController {
    constructor(@Inject() private service: DeleteShadowService) {
    }
    @Delete('delete/:id')
    async createShadow(@Param('id') request) {
        const command = new DeleteShadowCommand(request);
        return await this.service.execute(command);
    }
}
