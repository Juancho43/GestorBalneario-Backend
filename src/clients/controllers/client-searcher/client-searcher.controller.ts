import {Controller, Get, HttpException, HttpStatus, Inject, Query} from '@nestjs/common';
import {ClientSearcherService} from "../../services/client-searcher/client-searcher.service";
import {ClientSearchQuery} from "../../../../core/Client/Application/Queries/ClientSearchQuery";
import {ApiTags} from "@nestjs/swagger";
@ApiTags('Frontend')
@Controller('client')
export class ClientSearcherController{

    constructor(@Inject() private service: ClientSearcherService) {
    }
    @Get('search')
    execute(
        @Query('query') query: string,
        @Query('page') page: number,
        @Query('limit') limit: number
    ){
        try {
            const searchQuery = new ClientSearchQuery(query,limit,page)
            return this.service.execute(searchQuery);
        }catch(error){
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }
}
