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

@Module({
    controllers:[GetSeasonController, GetSeasonsController, CreateSeasonController],
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
        CreateSeasonService, GetSeasonService, GetSeasonsService]
})
export class SeasonModule {}
