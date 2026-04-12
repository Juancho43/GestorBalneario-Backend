import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ShadowModule } from './shadow/shadow.module';
import { DatabaseModule } from './database/database.module';
import { ClientsModule } from './clients/clients.module';
import { ReservationModule } from './reservation/reservation.module';
import { PaymentsModule } from './payments/payments.module';
import { EventsModule } from './events/eventsModule';
import { InvoicesModule } from './invoices/invoices.module';
import { ServicesModule } from './services/services.module';
import { SeasonModule } from './seasons/season.module';
import { GetSeasonReservationsController } from './reservation/controllers/get-season-reservations/get-season-reservations.controller';
import { GetSeasonReservationsService } from './reservation/services/services/get-season-reservations/get-season-reservations.service';

@Module({
  imports: [
    ShadowModule,
    DatabaseModule,
    ClientsModule,
    ReservationModule,
    PaymentsModule,
    EventsModule,
    InvoicesModule,
    ServicesModule,
    SeasonModule,
  ],
  controllers: [AppController, GetSeasonReservationsController],
  providers: [AppService, GetSeasonReservationsService],
})
export class AppModule {}
