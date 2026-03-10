import {Controller, Get} from '@nestjs/common';

@Controller('shadow')
export class GetByIdShadowController {
    @Get(':id')
    getShadowById() {

    }
}
