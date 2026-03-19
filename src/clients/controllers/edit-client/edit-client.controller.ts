import {Body, Controller, HttpException, HttpStatus, Inject, Put} from '@nestjs/common';
import {EditClientService} from "../../services/edit-client/edit-client.service";
import {UpdateClientCommand} from "../../../../core/Client/Application/DTO/UpdateClientCommand";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {ClientResponse} from "../../../../core/Client/Application/DTO/ClientResponse";

@ApiTags('Client')
@Controller('client')
export class EditClientController {
    constructor(@Inject() private readonly service: EditClientService) {
    }

    @Put('update')
    @ApiOperation({summary: 'Edit a client', description: 'Edits a client' })
    @ApiResponse({status: 200, description: 'The client has been updated.', type: ClientResponse})
    @ApiResponse({status: 500, description: 'The client has not been updated. Server Error'})
    async execute(@Body()request: UpdateClientCommand) {
        try {
            return await this.service.execute(request);
        }catch (error) {
            return new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }
}

