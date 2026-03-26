import {Controller, Get, HttpException, HttpStatus, Inject, Param} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {SeasonResponse} from "../../../../core/Season/Application/DTO/SeasonResponse";
import {GetSeasonQuery} from "../../../../core/Season/Application/DTO/GetSeasonQuery";
import {GetSeasonService} from "../../services/get-season/get-season.service";
@ApiTags('Season')
@Controller('season')
export class GetSeasonController {

    constructor(@Inject() private service: GetSeasonService) {

    }

    @Get('get/:id')
    @ApiOperation({summary: 'Gets a season', description: 'Gets a season by id' })
    @ApiResponse({status: 200, description: 'The season has been retrieved.', type: SeasonResponse})
    @ApiResponse({status: 500, description: 'The season has not been retrieved. Server Error'})
    async execute(@Param('id') id: string) {
        try {
            const query = new GetSeasonQuery(id);
            return await this.service.execute(query);
        }catch (error) {
            return new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }
}
