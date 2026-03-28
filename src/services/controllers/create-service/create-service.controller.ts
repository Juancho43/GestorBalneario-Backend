import {Body, Controller, HttpException, HttpStatus, Inject, Post} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {CreateServiceCommand} from "../../../../core/Service/Application/DTO/CreateServiceCommand";
import {CreateServiceService} from "../../service/create-service/create-service.service";
import {ServiceResponse} from "../../../../core/Service/Application/DTO/ServiceResponse";
@ApiTags('Service')
@Controller('service')
export class CreateServiceController {
    constructor(@Inject() private service: CreateServiceService) {
    }
    @Post('create')
    @ApiOperation({summary: 'Create a service', description: 'Creates new service' })
    @ApiResponse({status: 201, description: 'The service has been created.', type: ServiceResponse})
    @ApiResponse({status: 500, description: 'The service has not been created. Server Error'})
    async execute(@Body() request: CreateServiceCommand){
        try {
            return await this.service.execute(request);
        }catch(error){
            return new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }
}
