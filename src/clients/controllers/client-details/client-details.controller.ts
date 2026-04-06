import {Controller, Get, HttpException, HttpStatus, Inject, Param, Query} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";
import {ClientDetailsService} from "../../services/client-details/client-details.service";
import {GetClientQuery} from "../../../../core/Client/Application/Queries/GetClientQuery";
import {ClientDetailQuery} from "../../../../core/Client/Application/Queries/ClientDetailQuery";
@ApiTags('Frontend')
@Controller('client')
export class ClientDetailsController {

    constructor(@Inject() private service: ClientDetailsService) {
    }

    @Get('detail/:id')
    execute(
        @Param('id') id: string,
        @Query('page') page: string ,
        @Query('limit') limit: string
        ) {
        try{
            return this.service.execute(new ClientDetailQuery(id,limit,page));
        }catch(error){
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }
}
