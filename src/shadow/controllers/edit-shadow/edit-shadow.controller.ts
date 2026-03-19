import {Body, Controller, HttpException, HttpStatus, Inject, Put} from '@nestjs/common';
import {EditShadowService} from "../../services/edit-shadow/edit-shadow.service";
import {UpdateShadowCommand} from "../../../../core/Shadow/Application/DTO/UpdateShadowCommand";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {ShadowResponse} from "../../../../core/Shadow/Application/DTO/ShadowResponse";

@ApiTags('Shadow')
@Controller('shadow')
export class EditShadowController {
    constructor(@Inject() private service: EditShadowService) {
    }
    @Put('update')

    @ApiOperation({summary: 'Edit a shadow', description: 'Edits a shadow' })
    @ApiResponse({status: 200, description: 'The shadow has been updated.', type: ShadowResponse})
    @ApiResponse({status: 500, description: 'The shadow has not been updated. Server Error'})
    async execute(@Body()request: UpdateShadowCommand) {
        try {
            return await this.service.execute(request);
        }catch (error) {
            return new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }
}
