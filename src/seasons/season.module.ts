import { Module } from '@nestjs/common';
import { CreateSeasonService } from './services/create-season/create-season.service';
import { GetSeasonService } from './services/get-season/get-season.service';
import { GetSeasonController } from './controllers/get-season/get-season.controller';
import { CreateSeasonController } from './controllers/create-season/create-season.controller';
import { SqliteGetSeasons } from './repository/SqliteGetSeasons';
import { SqliteGetSeason } from './repository/SqliteGetSeason';
import { SqliteCreateSeason } from './repository/SqliteCreateSeason';
import { GetActiveSeasonController } from './controllers/get-active-season/get-active-season.controller';
import { GetActiveSeasonService } from './services/get-active-season/get-active-season.service';
import { SqliteGetActiveSeason } from './repository/SqliteGetActiveSeason';
import { SetActiveSeasonController } from './controllers/set-active-season/set-active-season.controller';
import { SetActiveSeasonService } from './services/set-active-season/set-active-season.service';
import { SqliteSetActiveSeason } from './repository/SqliteSetActiveSeason';
import { SqliteCloneSeason } from './repository/SqliteCloneSeason';
import { SqliteGetSeasonShadowsServices } from './repository/SqliteGetSeasonShadowsServices';
import { CloneSeasonController } from './controllers/clone-season/clone-season.controller';
import { CloneSeasonService } from './services/clone-season/clone-season.service';
import { DeleteSeasonController } from './controllers/delete-season/delete-season.controller';
import { EditSeasonController } from './controllers/edit-season/edit-season.controller';
import { SeasonHistoryController } from './controllers/season-history/season-history.controller';
import {GetSeasonsHistoryService} from "./services/get-seasons-history/get-seasons-history.service";

@Module({
  controllers: [
    GetSeasonController,
    CreateSeasonController,
    GetActiveSeasonController,
    SetActiveSeasonController,
    CloneSeasonController,
    DeleteSeasonController,
    EditSeasonController,
    SeasonHistoryController,
  ],
  providers: [
    {
      provide: 'GET_SEASON',
      useClass: SqliteGetSeason,
    },
    {
      provide: 'GET_SEASONS',
      useClass: SqliteGetSeasons,
    },
    {
      provide: 'CREATE_SEASON',
      useClass: SqliteCreateSeason,
    },
    {
      provide: 'GET_ACTIVE',
      useClass: SqliteGetActiveSeason,
    },
    {
      provide: 'SET_ACTIVE',
      useClass: SqliteSetActiveSeason,
    },
    {
      provide: 'CLONE_SEASON',
      useClass: SqliteCloneSeason,
    },
    {
      provide: 'GET_SEASON_DATA',
      useClass: SqliteGetSeasonShadowsServices,
    },
    {
      provide: 'GET_HISTORY',
      useClass: SqliteGetSeasons
    },
    CreateSeasonService,
    GetSeasonService,
    GetActiveSeasonService,
    SetActiveSeasonService,
    GetSeasonsHistoryService,
    CloneSeasonService,
  ],
  exports: [GetActiveSeasonService],
})
export class SeasonModule {}
