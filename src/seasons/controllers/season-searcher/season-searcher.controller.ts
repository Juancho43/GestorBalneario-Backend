import {Controller, Get, Inject, Query} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {CreateAppResponse} from "../../../../core/common/Application/CreateAppResponse";
import {SeasonSearchQuery} from "../../../../core/Season/Application/Queries/SeasonSearchQuery";
import {SeasonSearcherService} from "../../services/season-searcher/season-searcher.service";

@ApiTags('Frontend')
@Controller('season')
export class SeasonSearcherController {

    constructor(@Inject() private service: SeasonSearcherService) {}
    @ApiOperation({
        summary: 'Season searcher',
        description: 'Search a season',
    })
    @ApiResponse({
        status: 200,
        description: 'The seasons has been searched.',
    })
    @ApiResponse({
        status: 500,
        description: 'The seasons has not been searched. Server Error',
    })
    @Get('search')
    async execute(
        @Query('query') query: string,
        @Query('page') page: number,
        @Query('direction') direction: string,
        @Query('state') state: string,
        @Query('limit') limit: number,
    ) {
        const searchQuery = new SeasonSearchQuery(page, limit, query,state,direction);
        const data = await this.service.execute(searchQuery);
        return CreateAppResponse.successResponse('The seasons have been searched successfully',data);
    }
}
