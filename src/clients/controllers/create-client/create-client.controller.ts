import {Body, Controller, HttpException, HttpStatus, Inject, Post} from '@nestjs/common';
import {CreateClientService} from "../../services/create-client/create-client.service";
import {CreateClientCommand} from "../../../../core/Client/Application/DTO/CreateClientCommand";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {ClientResponse} from "../../../../core/Client/Application/DTO/ClientResponse";

@ApiTags('Client')
@Controller('client')
export class CreateClientController {
    constructor(@Inject() private service: CreateClientService) {
    }
    @Post('create')
    @ApiOperation({summary: 'Create a client', description: 'Creates new client' })
    @ApiResponse({status: 201, description: 'The client has been created.', type: ClientResponse})
    @ApiResponse({status: 500, description: 'The client has not been created. Server Error'})
    async execute(@Body()request: CreateClientCommand) {
        try {
            return await this.service.execute(request);
        }catch (error) {
            return new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }
}
