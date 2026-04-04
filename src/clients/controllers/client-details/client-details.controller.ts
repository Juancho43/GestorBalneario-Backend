import {Controller, Get, HttpException, HttpStatus, Inject, Param} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";
import {ClientDetailsService} from "../../services/client-details/client-details.service";
import {GetClientQuery} from "../../../../core/Client/Application/Queries/GetClientQuery";
@ApiTags('Frontend')
@Controller('client')
export class ClientDetailsController {

    constructor(@Inject() private service: ClientDetailsService) {
    }

    @Get('detail/:id')
    execute(@Param('id') id: string) {
        try{
            return this.service.execute(new GetClientQuery(id));
        }catch(error){
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }
}
