import {Controller, Get, Inject, Query} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {CreateAppResponse} from "../../../../core/common/Application/CreateAppResponse";
import {InvoicesSearcherService} from "../../services/invoices-searcher/invoices-searcher.service";
import {InvoiceSearchQuery} from "../../../../core/Invoice/Application/Queries/InvoiceSearchQuery";

@ApiTags('Frontend')
@Controller('invoice')
export class InvoiceSearcherController {
    constructor(@Inject() private service: InvoicesSearcherService) {}
    @ApiOperation({
        summary: 'Invoice searcher',
        description: 'Search a invoice by name, phone or email.',
    })
    @ApiResponse({
        status: 200,
        description: 'The invoices has been searched.',
    })
    @ApiResponse({
        status: 500,
        description: 'The invoices has not been searched. Server Error',
    })
    @Get('search')
    async execute(
        @Query('seasonId') seasonId: string,
        @Query('query') query: string,
        @Query('page') page: number,
        @Query('orderBy') orderBy: string,
        @Query('direction') direction: string,
        @Query('state') state: string,
        @Query('limit') limit: number,
    ) {
        const searchQuery = new InvoiceSearchQuery(page, limit, query,seasonId,orderBy,state,direction);
        const data = await this.service.execute(searchQuery);
        return CreateAppResponse.successResponse('The invoices have been searched successfully',data);
    }
}
