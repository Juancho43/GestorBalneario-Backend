import {Controller, Get, HttpException, HttpStatus, Inject, Param} from '@nestjs/common';
import {GetClientService} from "../../services/get-client/get-client.service";
import {GetClientQuery} from "../../../../core/Client/Application/DTO/GetClientQuery";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {ClientResponse} from "../../../../core/Client/Application/DTO/ClientResponse";

@ApiTags('Client')
@Controller('client')
export class GetClientController {
    constructor(@Inject() private service: GetClientService) {
    }
    @Get('get/:id')

    @ApiOperation({summary: 'Gets a client', description: 'Gets a client by id' })
    @ApiResponse({status: 200, description: 'The client has been retrieved.', type: ClientResponse})
    @ApiResponse({status: 500, description: 'The client has not been retrieved. Server Error'})
    async execute(@Param('id') id: string) {
        try {
            const query = new GetClientQuery(id);
            return await this.service.execute(query);
        }catch (error) {
            return new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }
}



