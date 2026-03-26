import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ShadowModule } from './shadow/shadow.module';
import { DatabaseModule } from './database/database.module';
import { ClientsModule } from './clients/clients.module';
import { ReservationModule } from './reservation/reservation.module';
import { PaymentsModule } from './payments/payments.module';
import { BillingModule } from './billing/billing.module';
import { InvoicesModule } from './invoices/invoices.module';
import { ServicesModule } from './services/services.module';
import { SeasonModule } from './seasons/season.module';

@Module({
  imports: [ShadowModule, DatabaseModule, ClientsModule, ReservationModule, PaymentsModule, BillingModule, InvoicesModule, ServicesModule, SeasonModule],
  controllers: [AppController, ],
  providers: [AppService, ],
})
export class AppModule {}
