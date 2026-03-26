import {Controller, Get, HttpException, HttpStatus, Inject, Query} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {GetServiceService} from "../../service/get-service/get-service.service";
import {GetsServicesService} from "../../service/gets-services/gets-services.service";
@ApiTags('Service')
@Controller('services')
export class GetsServicesController {

    constructor(@Inject() private service: GetsServicesService) {}
    @Get('current')
    @ApiOperation({summary: 'Gets services', description: 'Gets a list of current services.' })
    @ApiResponse({status: 200, description: 'The services has been retrieved.'})
    @ApiResponse({status: 500, description: 'The services has not been retrieved.'})
    async execute(@Query('page') page: number = 1, @Query('size') size: number = 10){
       try {
           return await this.service.execute();
       } catch (e) {
           return new HttpException(e.message, HttpStatus.BAD_REQUEST);
       }
    }
}
