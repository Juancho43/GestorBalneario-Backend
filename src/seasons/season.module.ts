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

@Module({
    controllers:[GetSeasonController, GetSeasonsController, CreateSeasonController, GetActiveSeasonController],
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
        CreateSeasonService,
        GetSeasonService,
        GetSeasonsService,
        GetActiveSeasonService
    ],
    exports:[GetActiveSeasonService]
})
export class SeasonModule {}
