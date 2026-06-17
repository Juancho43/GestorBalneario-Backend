import {Provider} from '@nestjs/common';
import {SEASON_TOKEN} from '../SEASON_TOKEN';
import {GetSeason} from '../../../core/Season/Application/UseCase/CRUD/GetSeason';
import {CreateSeason} from '../../../core/Season/Application/UseCase/CRUD/CreateSeason';
import {UpdateSeason} from '../../../core/Season/Application/UseCase/CRUD/UpdateSeason';
import {DeleteSeason} from '../../../core/Season/Application/UseCase/CRUD/DeleteSeason';
import {GetActiveSeason} from '../../../core/Season/Application/UseCase/GetActiveSeason';
import {GetSeasonsHistory} from '../../../core/Season/Application/UseCase/GetSeasonsHistory';
import {SeasonSearch} from "../../../core/Season/Application/UseCase/SeasonSearch";
import {SeasonClientsDebt} from "../../../core/Season/Application/UseCase/SeasonClientsDebt";
import {SeasonDetails} from "../../../core/Season/Application/UseCase/SeasonDetails";

export const SeasonUseCaseProviders: Provider[] = [
  {
    provide: SEASON_TOKEN.USECASE.GET_SEASON,
    useFactory: (get) => {
      return new GetSeason(get);
    },
    inject: [SEASON_TOKEN.DAOS.GET_SEASON],
  },
  {
    provide: SEASON_TOKEN.USECASE.CREATE_SEASON,
    useFactory: (dao) => {
      return new CreateSeason(dao);
    },
    inject: [SEASON_TOKEN.DAOS.CREATE_SEASON_DAO],
  },
  {
    provide: SEASON_TOKEN.USECASE.UPDATE_SEASON,
    useFactory: (dao, get) => {
      return new UpdateSeason(dao, get);
    },
    inject: [SEASON_TOKEN.DAOS.UPDATE_SEASON_DAO, SEASON_TOKEN.DAOS.GET_SEASON],
  },
  {
    provide: SEASON_TOKEN.USECASE.DELETE_SEASON,
    useFactory: (dao, get) => {
      return new DeleteSeason(dao, get);
    },
    inject: [SEASON_TOKEN.DAOS.DELETE_SEASON_DAO, SEASON_TOKEN.DAOS.GET_SEASON],
  },
  {
    provide: SEASON_TOKEN.USECASE.CURRENT_SEASON,
    useFactory: (dao) => {
      return new GetActiveSeason(dao);
    },
    inject: [SEASON_TOKEN.DAOS.CURRENT_SEASON_DAO],
  },
  {
    provide: SEASON_TOKEN.USECASE.GET_HISTORY,
    useFactory: (dao) => {
      return new GetSeasonsHistory(dao);
    },
    inject: [SEASON_TOKEN.DAOS.GET_HISTORY],
  },
  {
    provide: SEASON_TOKEN.USECASE.SEARCHER,
    useFactory: (dao) => {
      return new SeasonSearch(dao);
    },
    inject: [SEASON_TOKEN.DAOS.SEARCHER],
  },
  {
    provide: SEASON_TOKEN.USECASE.CLIENTS_DEBT,
    useFactory: (dao) => {
      return new SeasonClientsDebt(dao);
    },
    inject: [SEASON_TOKEN.DAOS.CLIENTS_DEBT],
  },
  {
    provide: SEASON_TOKEN.USECASE.GET_DETAILS,
    useFactory: (dao) => {
      return new SeasonDetails(dao)
    },
    inject : [SEASON_TOKEN.DAOS.GET_DETAILS],
  }
];
