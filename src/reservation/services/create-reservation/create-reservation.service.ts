import {Inject, Injectable, Logger} from '@nestjs/common';
import {CreateReservation} from "../../../../core/Reservation/Application/CreateReservation";
import type {CreateReservationDAO} from "../../../../core/Reservation/Model/DAO/CreateReservationDAO";
import type {GetShadowDAO} from "../../../../core/Shadow/Model/DAO/GetShadowDAO";
import type {GetClientDAO} from "../../../../core/Client/Model/DAO/GetClientDAO";
import {CreateReservationCommand} from "../../../../core/Reservation/Application/DTO/CreateReservationCommand";
import {ReservationResponse} from "../../../../core/Reservation/Application/DTO/ReservationResponse";
import type {EventPublisher} from "../../../../core/common/Application/EventPublisher";
import type {GetServiceDAO} from "../../../../core/Service/Model/DAO/GetServiceDAO";

@Injectable()
export class CreateReservationService {
    private useCase: CreateReservation;
    private logger = new Logger(CreateReservationService.name);
    constructor(@Inject('CREATE_RESERVATION_DAO') implementation: CreateReservationDAO,
                @Inject('GET_SERVICE_INTERFACE') service: GetServiceDAO,
                @Inject('GET_SHADOW_INTERFACE') shadow: GetShadowDAO,
                @Inject('GET_CLIENT_INTERFACE') client: GetClientDAO,
                @Inject('EVENT') event: EventPublisher
    ) {
        this.useCase = new CreateReservation(implementation,service,shadow,client,event);
    }

    async execute(command: CreateReservationCommand) {
        try {
            this.logger.debug('Creating a reservation', command);
            return ReservationResponse.create(await this.useCase.execute(command));
        }catch (error) {
            this.logger.error('Error creating reservation:', error);
            throw error;
        }
    }
}
