import {Controller, Delete, Inject, Param} from '@nestjs/common';
import {DeleteReservationService} from "../../services/delete-reservation/delete-reservation.service";
import {DeleteReservationCommand} from "../../../../core/Reservation/Application/DTO/DeleteReservationCommand";
import {ApiTags} from "@nestjs/swagger";

@ApiTags('Reservation')
@Controller('reservation')
export class DeleteReservationController {
    constructor(@Inject() private service: DeleteReservationService) {

    }
    @Delete('delete/:id')
    async createShadow(@Param('id') request) {
        const command = new DeleteReservationCommand(request);
        return await this.service.execute(command);
    }
}
