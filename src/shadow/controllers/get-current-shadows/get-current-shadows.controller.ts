import {Controller, Get, HttpException, HttpStatus, Inject} from '@nestjs/common';
import {GetCurrentShadowsService} from "../../services/get-current-shadows/get-current-shadows.service";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";

@ApiTags('Shadow')
@Controller('shadow')
export class GetCurrentShadowsController {
    constructor(@Inject() private get: GetCurrentShadowsService) {
    }
    @Get('current')
    @ApiOperation({summary: 'Gets shadows', description: 'Gets all the shadows.' })
    @ApiResponse({status: 200, description: 'The shadows has been retrieved.'})
    @ApiResponse({status: 500, description: 'The shadows has not been retrieved.'})
    async execute() {
        try {
            return await this.get.get();
        }catch (error) {
            return new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }
}
