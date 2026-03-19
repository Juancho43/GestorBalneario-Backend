import {Body, Controller, Get, HttpException, HttpStatus, Inject, Param} from '@nestjs/common';
import {GetShadowByIdQuery} from "../../../../core/Shadow/Application/DTO/GetShadowByIdQuery";
import {GetShadowService} from "../../services/get-shadow/get-shadow.service";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";

@ApiTags('Shadow')
@Controller('shadow')
export class GetByIdShadowController {

    constructor(@Inject() private service: GetShadowService) {
    }
    @Get('get/:id')
    @ApiOperation({summary: 'Get shadow', description: 'Gets a shadow by its id.' })
    @ApiResponse({status: 200, description: 'The shadow has been retrieved.'})
    @ApiResponse({status: 500, description: 'The shadow has not been retrieved.'})
    async execute(@Param('id') id: string) {
        try{
            const query = new GetShadowByIdQuery(id);
            return await this.service.execute(query);
        }catch (error){
            return new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }
}
