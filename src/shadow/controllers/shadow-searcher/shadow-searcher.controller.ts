import {Controller, Get, Inject, Query} from '@nestjs/common';
import {ApiOperation, ApiQuery, ApiResponse, ApiTags} from "@nestjs/swagger";
import {CreateAppResponse} from "../../../../core/common/Application/CreateAppResponse";
import {ShadowSearchQuery} from "../../../../core/Shadow/Application/Queries/ShadowSearchQuery";
import {ShadowSearcherService} from "../../services/shadow-searcher/shadow-searcher.service";

@ApiTags('Frontend')
@Controller('shadow')
export class ShadowSearcherController {
    constructor(@Inject() private service: ShadowSearcherService) {}
    @ApiOperation({
        summary: 'Shadow searcher',
        description: 'Search a shadow by name, phone or email.',
    })
    @ApiResponse({
        status: 200,
        description: 'The shadows has been searched.',
    })
    @ApiResponse({
        status: 500,
        description: 'The shadows has not been searched. Server Error',
    })
    @ApiQuery({ name: 'query', required: false, type: String })
    @Get('search')
    async execute(
        @Query('seasonId') seasonId: string,
        @Query('page') page: number,
        @Query('type') type: string,
        @Query('direction') direction: string,
        @Query('state') state: string,
        @Query('limit') limit: number,
        @Query('query') query?: string,
    ) {
        const searchQuery = new ShadowSearchQuery(page, limit, query,seasonId,direction,state,type);
        const data = await this.service.execute(searchQuery);
        return CreateAppResponse.successResponse('The shadows have been searched successfully',data);
    }
}
