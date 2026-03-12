import {Controller, Get, Inject} from '@nestjs/common';
import {GetCurrentShadowsService} from "../../services/get-current-shadows/get-current-shadows.service";

@Controller('shadow')
export class GetCurrentShadowsController {
    constructor(@Inject() private get: GetCurrentShadowsService) {
    }
    @Get('current')
    async getCurrentShadows() {
        return await this.get.get();
    }

}
