import {Controller, Delete, HttpException, Inject, Param} from '@nestjs/common';
import {DeleteShadowService} from "../../services/delete-shadow/delete-shadow.service";
import {DeleteShadowCommand} from "../../../../core/Shadow/Application/Command/DeleteShadowCommand";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";

@ApiTags('Shadow')
@Controller('shadow')
export class DeleteShadowController {
    constructor(@Inject() private service: DeleteShadowService) {
    }
    @Delete('delete/:id')
    @ApiOperation({summary: 'Delete a shadow', description: 'Delete a shadow by id' })
    @ApiResponse({status: 204, description: 'The shadow has been deleted.'})
    @ApiResponse({status: 500, description: 'The shadow has not been deleted. Server Error'})
    async execute(@Param('id') request:string) {
        try{
            const command = new DeleteShadowCommand(request);
            return await this.service.execute(command);
        }catch(error){
            return new HttpException(error.message,500);
        }
    }
}
