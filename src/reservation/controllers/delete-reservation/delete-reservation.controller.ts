import {Controller, Delete, HttpException, Inject, Param} from '@nestjs/common';
import {DeleteReservationService} from "../../services/delete-reservation/delete-reservation.service";
import {DeleteReservationCommand} from "../../../../core/Reservation/Application/DTO/DeleteReservationCommand";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";

@ApiTags('Reservation')
@Controller('reservation')
export class DeleteReservationController {
    constructor(@Inject() private service: DeleteReservationService) {
    }
    @Delete('delete/:id')
    @ApiOperation({summary: 'Delete a reservation', description: 'Delete a reservation by id' })
    @ApiResponse({status: 204, description: 'The reservation has been deleted.'})
    @ApiResponse({status: 500, description: 'The reservation has not been deleted. Server Error'})
    async execute(@Param('id') request) {
        try {
            const command = new DeleteReservationCommand(request);
            return await this.service.execute(command);
        }catch (error) {
            return new HttpException(error.message,500);
        }
    }
}
