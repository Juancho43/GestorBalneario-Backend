import {Controller, Get, HttpException, HttpStatus, Inject, Param} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {ServiceResponse} from "../../../../core/Service/Application/DTO/ServiceResponse";
import {GetServiceService} from "../../service/get-service/get-service.service";
import {GetServiceQuery} from "../../../../core/Service/Application/DTO/GetServiceQuery";
@ApiTags('Service')
@Controller('service')
export class GetServiceController {
    constructor(@Inject() private service: GetServiceService) {
    }

    @Get('get/:id')
    @ApiOperation({summary: 'Get service', description: 'Gets a service by its id.'})
    @ApiResponse({status: 200, description: 'The service has been retrieved.', type: ServiceResponse})
    @ApiResponse({status: 500, description: 'The service has not been retrieved.'})
    async execute(@Param('id') id: string) {
        try {
            const query = new GetServiceQuery(id);
            return await this.service.execute(query);
        }catch (error) {
            return new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }
}
