import {Body, Controller, Inject, Put} from '@nestjs/common';
import {EditShadowService} from "../../services/edit-shadow/edit-shadow.service";
import {UpdateShadowCommand} from "../../../../core/Shadow/Application/DTO/UpdateShadowCommand";
import {ApiTags} from "@nestjs/swagger";

@ApiTags('Shadow')
@Controller('shadow')
export class EditShadowController {
    constructor(@Inject() private service: EditShadowService) {
    }
    @Put('update')
    async createShadow(@Body()request: UpdateShadowCommand) {
        return await this.service.execute(request);
    }
}
