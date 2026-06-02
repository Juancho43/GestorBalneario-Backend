import {Controller, Get, Inject, Query} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {CreateAppResponse} from "../../../../core/common/Application/CreateAppResponse";
import {ServiceSearcherService} from "../../service/service-searcher/service-searcher.service";
import {ServiceSearchQuery} from "../../../../core/Service/Application/Queries/ServiceSearchQuery";

@ApiTags('Frontend')
@Controller('service')
export class ServiceSearcherController {
    constructor(@Inject() private service: ServiceSearcherService) {}
    @ApiOperation({
        summary: 'Service searcher',
        description: 'Search a service by name, phone or email.',
    })
    @ApiResponse({
        status: 200,
        description: 'The services has been searched.',
    })
    @ApiResponse({
        status: 500,
        description: 'The services has not been searched. Server Error',
    })
    @Get('search')
    async execute(
        @Query('seasonId') seasonId: string,
        @Query('query') query: string,
        @Query('page') page: number,
        @Query('orderBy') orderBy: string,
        @Query('direction') direction: string,
        @Query('limit') limit: number,
    ) {
        const searchQuery = new ServiceSearchQuery(page, limit, query,seasonId,orderBy,direction);
        const data = await this.service.execute(searchQuery);
        return CreateAppResponse.successResponse('The services have been searched successfully',data);
    }
}
