import {Controller, Get, Inject, Query} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {CreateAppResponse} from "../../../../core/common/Application/CreateAppResponse";
import {ReservationSearcherService} from "../../services/reservation-searcher/reservation-searcher.service";
import {ReservationSearchQuery} from "../../../../core/Reservation/Application/Queries/ReservationSearchQuery";

@ApiTags('Frontend')
@Controller('reservation')
export class ReservationSearcherController {

    constructor(@Inject() private service: ReservationSearcherService) {}
    @ApiOperation({
        summary: 'Reservation searcher',
        description: 'Search a reservation by name, phone or email.',
    })
    @ApiResponse({
        status: 200,
        description: 'The reservations has been searched.',
    })
    @ApiResponse({
        status: 500,
        description: 'The reservations has not been searched. Server Error',
    })
    @Get('search')
    async execute(
        @Query('seasonId') seasonId: string,
        @Query('query') query: string,
        @Query('page') page: number,
        @Query('direction') direction: string,
        @Query('state') state: string,
        @Query('limit') limit: number,
    ) {
        const searchQuery = new ReservationSearchQuery(page, limit, query,seasonId,state,direction);
        const data = await this.service.execute(searchQuery);
        return CreateAppResponse.successResponse('The reservations have been searched successfully',data);
    }
}
