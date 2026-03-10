import {Controller, Delete} from '@nestjs/common';

@Controller('shadow')
export class DeleteShadowController {
    @Delete('delete')
    deleteShadow() {

    }
}
