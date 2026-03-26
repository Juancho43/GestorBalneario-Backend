import {Body, Controller, HttpException, HttpStatus, Inject, Post} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {SeasonResponse} from "../../../../core/Season/Application/DTO/SeasonResponse";
import {CreateSeasonCommand} from "../../../../core/Season/Application/DTO/CreateSeasonCommand";
import {CreateSeasonService} from "../../services/create-season/create-season.service";

@ApiTags('Season')
@Controller('season')
export class CreateSeasonController {
    constructor(@Inject() private service: CreateSeasonService) {
    }
    @Post('create')
    @ApiOperation({summary: 'Create a season', description: 'Creates new season' })
    @ApiResponse({status: 201, description: 'The season has been created.', type: SeasonResponse})
    @ApiResponse({status: 500, description: 'The season has not been created. Server Error'})
    execute(@Body() request: CreateSeasonCommand){
        try {
            return this.service.execute(request);
        }catch(error){
            return new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }
}
