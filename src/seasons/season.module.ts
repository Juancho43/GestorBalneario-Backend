import { Module } from '@nestjs/common';
import {CreateSeasonService} from "./services/create-season/create-season.service";
import {GetSeasonService} from "./services/get-season/get-season.service";
import {GetSeasonsService} from "./services/get-seasons/get-seasons.service";
import {GetSeasonsController} from "./controllers/get-seasons/get-seasons.controller";
import {GetSeasonController} from "./controllers/get-season/get-season.controller";
import {CreateSeasonController} from "./controllers/create-season/create-season.controller";
import {SqliteGetSeasons} from "./repository/SqliteGetSeasons";
import {SqliteGetSeason} from "./repository/SqliteGetSeason";
import {SqliteCreateSeason} from "./repository/SqliteCreateSeason";
import { GetActiveSeasonController } from './controllers/get-active-season/get-active-season.controller';
import { GetActiveSeasonService } from './services/get-active-season/get-active-season.service';
import {SqliteGetActiveSeason} from "./repository/SqliteGetActiveSeason";
import { SetActiveSeasonController } from './controllers/set-active-season/set-active-season.controller';
import { SetActiveSeasonService } from './services/set-active-season/set-active-season.service';
import {SqliteSetActiveSeason} from "./repository/SqliteSetActiveSeason";
import {SqliteCloneSeason} from "./repository/SqliteCloneSeason";
import {SqliteGetSeasonShadowsServices} from "./repository/SqliteGetSeasonShadowsServices";
import { CloneSeasonController } from './controllers/clone-season/clone-season.controller';
import { CloneSeasonService } from './services/clone-season/clone-season.service';

@Module({
    controllers:[
        GetSeasonController,
        GetSeasonsController,
        CreateSeasonController,
        GetActiveSeasonController,
        SetActiveSeasonController,
        CloneSeasonController
    ],
    providers: [
        {
          provide:"GET_SEASON",
            useClass: SqliteGetSeason
        },
        {
            provide: 'GET_SEASONS',
            useClass: SqliteGetSeasons
        },
        {
          provide:'CREATE_SEASON',
          useClass: SqliteCreateSeason
        },
        {
            provide:'GET_ACTIVE',
            useClass: SqliteGetActiveSeason
        },
        {
            provide: 'SET_ACTIVE',
            useClass: SqliteSetActiveSeason
        },
        {
          provide: 'CLONE_SEASON',
          useClass: SqliteCloneSeason
        },
        {
            provide: 'GET_SEASON_DATA',
            useClass: SqliteGetSeasonShadowsServices
        },
        CreateSeasonService,
        GetSeasonService,
        GetSeasonsService,
        GetActiveSeasonService,
        SetActiveSeasonService,
        CloneSeasonService
    ],
    exports:[GetActiveSeasonService]
})
export class SeasonModule {}
