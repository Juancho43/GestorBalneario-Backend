import {Body, Controller, HttpException, HttpStatus, Inject, Put, UseGuards} from '@nestjs/common';
import {EditShadowService} from "../../services/edit-shadow/edit-shadow.service";
import {UpdateShadowCommand} from "../../../../core/Shadow/Application/Command/UpdateShadowCommand";
import {ApiHeader, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {ShadowResponse} from "../../../../core/Shadow/Application/Response/ShadowResponse";
import {CurrentSeasonGuard} from "../../../current-season/current-season.guard";

@ApiTags('Shadow')
@Controller('shadow')
export class EditShadowController {
    constructor(@Inject() private service: EditShadowService) {
    }
    @Put('update')
    @UseGuards(CurrentSeasonGuard)
    @ApiHeader({
        name: 'x-season', // El nombre exacto que espera su Guard
        description: 'ID de la temporada actual para procesar la petición',
        required: true,   // Esto hace que aparezca con el asterisco rojo en Swagger
        schema: {
            type: 'string',
            example: 'ab02c0fd-cfa8-4c5c-80dc-7ccfaa38f8dc' // Ayude al usuario con un ejemplo
        }
    })
    @ApiOperation({summary: 'Edit a shadow', description: 'Edits a shadow' })
    @ApiResponse({status: 200, description: 'The shadow has been updated.', type: ShadowResponse})
    @ApiResponse({status: 500, description: 'The shadow has not been updated. Server Error'})
    async execute(@Body()request: UpdateShadowCommand) {
        try {
            return await this.service.execute(request);
        }catch (error) {
            return new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }
}
