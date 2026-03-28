import {Body, Controller, HttpException, HttpStatus, Inject, Post} from '@nestjs/common';
import {CreateShadowCommand} from "../../../../core/Shadow/Application/Command/CreateShadowCommand";
import {CreateShadowService} from "../../services/create-shadow/create-shadow.service";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {ShadowResponse} from "../../../../core/Shadow/Application/Response/ShadowResponse";

@ApiTags('Shadow')
@Controller('shadow')
export class CreateShadowController {
    constructor(@Inject() private service: CreateShadowService) {
    }
    @Post('create')
    @ApiOperation({summary: 'Create a shadow', description: 'Creates new shadow' })
    @ApiResponse({status: 201, description: 'The shadow has been created.', type: ShadowResponse})
    @ApiResponse({status: 500, description: 'The shadow has not been created. Server Error'})
    async execute(@Body()request: CreateShadowCommand) {
        try {
            return await this.service.execute(request);
        }catch (error) {
            return new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }
}
