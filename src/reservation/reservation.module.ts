import { Module } from '@nestjs/common';
import { CreateReservationService } from './services/create-reservation/create-reservation.service';
import { EditReservationService } from './services/edit-reservation/edit-reservation.service';
import { DeleteReservationService } from './services/delete-reservation/delete-reservation.service';
import { GetReservationService } from './services/get-reservation/get-reservation.service';
import { GetCurrentReservationService } from './services/get-current-reservation/get-current-reservation.service';
import { GetCurrentReservationsController } from './controllers/get-current-reservations/get-current-reservations.controller';
import { EditReservationController } from './controllers/edit-reservation/edit-reservation.controller';
import { CreateReservationController } from './controllers/create-reservation/create-reservation.controller';
import { DeleteReservationController } from './controllers/delete-reservation/delete-reservation.controller';
import { GetReservationController } from './controllers/get-reservation/get-reservation.controller';

@Module({
  providers: [CreateReservationService, EditReservationService, DeleteReservationService, GetReservationService, GetCurrentReservationService],
  controllers: [GetCurrentReservationsController, EditReservationController, CreateReservationController, DeleteReservationController, GetReservationController]
})
export class ReservationModule {}
