import {Body, Controller, Delete, Inject} from '@nestjs/common';
import {DeleteShadowService} from "../../services/delete-shadow/delete-shadow.service";
import {DeleteShadowCommand} from "../../../../core/Shadow/Application/DTO/DeleteShadowCommand";

@Controller('shadow')
export class DeleteShadowController {
    constructor(@Inject() private service: DeleteShadowService) {
    }
    @Delete('delete')
    async createShadow(@Body()request: DeleteShadowCommand) {
        return await this.service.execute(request);
    }
}
