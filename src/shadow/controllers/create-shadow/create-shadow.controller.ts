import {Body, Controller, Inject, Post} from '@nestjs/common';
import {CreateShadowCommand} from "../../../../core/Shadow/Application/DTO/CreateShadowCommand";
import {CreateShadowService} from "../../services/create-shadow/create-shadow.service";
import {ApiTags} from "@nestjs/swagger";

@ApiTags('Shadow')
@Controller('shadow')
export class CreateShadowController {
    constructor(@Inject() private service: CreateShadowService) {
    }
    @Post('create')
    async createShadow(@Body()request: CreateShadowCommand) {
        return await this.service.execute(request);
    }
}
