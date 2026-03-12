import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CreateShadowController } from './shadow/controllers/create-shadow/create-shadow.controller';
import { EditShadowController } from './shadow/controllers/edit-shadow/edit-shadow.controller';
import { DeleteShadowController } from './shadow/controllers/delete-shadow/delete-shadow.controller';
import { GetByIdShadowController } from './shadow/controllers/get-by-id-shadow/get-by-id-shadow.controller';
import { ShadowModule } from './shadow/shadow.module';
import { CreateShadowService } from './shadow/services/create-shadow/create-shadow.service';
import { EditShadowService } from './shadow/services/edit-shadow/edit-shadow.service';
import { DeleteShadowService } from './shadow/services/delete-shadow/delete-shadow.service';
import { GetShadowService } from './shadow/services/get-shadow/get-shadow.service';
import { DatabaseModule } from './database/database.module';
import { DatabaseMigrationService } from './database/database-migration/database-migration.service';
import { GetCurrentShadowsController } from './shadow/controllers/get-current-shadows/get-current-shadows.controller';
import { GetCurrentShadowsService } from './shadow/services/get-current-shadows/get-current-shadows.service';
import { ClientsModule } from './clients/clients.module';
import { ReservationModule } from './reservation/reservation.module';

@Module({
  imports: [ShadowModule, DatabaseModule, ClientsModule, ReservationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
