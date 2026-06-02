import {Provider} from '@nestjs/common';
import {SEASON_TOKEN} from '../SEASON_TOKEN';
import {SqliteSeasonUpdate} from '../repository/CRUD/SqliteSeasonUpdate';
import {SqliteSeasonDelete} from '../repository/CRUD/SqliteSeasonDelete';
import {SqliteCreateSeason} from '../repository/CRUD/SqliteCreateSeason';
import {SqliteGetSeason} from '../repository/CRUD/SqliteGetSeason';
import {SqliteGetActiveSeason} from '../repository/SqliteGetActiveSeason';
import {SqliteGetSeasons} from '../repository/SqliteGetSeasons';
import {SqliteSetActiveSeason} from '../repository/SqliteSetActiveSeason';
import {SqliteCloneSeason} from '../repository/SqliteCloneSeason';
import {SqliteGetSeasonShadowsServices} from '../repository/SqliteGetSeasonShadowsServices';
import {SqliteSeasonSearch} from "../repository/SqliteSeasonSearch";

export const SeasonDaoProviders: Provider[] = [
  {
    provide: SEASON_TOKEN.DAOS.DELETE_SEASON_DAO,
    useClass: SqliteSeasonDelete,
  },
  {
    provide: SEASON_TOKEN.DAOS.CREATE_SEASON_DAO,
    useClass: SqliteCreateSeason,
  },
  {
    provide: SEASON_TOKEN.DAOS.UPDATE_SEASON_DAO,
    useClass: SqliteSeasonUpdate,
  },
  {
    provide: SEASON_TOKEN.DAOS.GET_SEASON,
    useClass: SqliteGetSeason,
  },
  {
    provide: SEASON_TOKEN.DAOS.CURRENT_SEASON_DAO,
    useClass: SqliteGetActiveSeason,
  },
  {
    provide: SEASON_TOKEN.DAOS.GET_HISTORY,
    useClass: SqliteGetSeasons,
  },
  {
    provide: SEASON_TOKEN.DAOS.SET_ACTIVE,
    useClass: SqliteSetActiveSeason,
  },
  {
    provide: SEASON_TOKEN.DAOS.CLONE_SEASON,
    useClass: SqliteCloneSeason,
  },
  {
    provide: SEASON_TOKEN.DAOS.GET_SEASON_DATA,
    useClass: SqliteGetSeasonShadowsServices,
  },
  {
    provide: SEASON_TOKEN.DAOS.SEARCHER,
    useClass: SqliteSeasonSearch,
  },
];
