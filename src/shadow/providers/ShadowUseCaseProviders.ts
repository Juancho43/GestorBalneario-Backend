import {Provider} from '@nestjs/common';
import {SHADOW_TOKEN} from '../SHADOW_TOKEN';
import {GetShadow} from '../../../core/Shadow/Application/UseCase/CRUD/GetShadow';
import {CreateShadow} from '../../../core/Shadow/Application/UseCase/CRUD/CreateShadow';
import {UpdateShadow} from '../../../core/Shadow/Application/UseCase/CRUD/UpdateShadow';
import {DeleteShadow} from '../../../core/Shadow/Application/UseCase/CRUD/DeleteShadow';
import {SEASON_TOKEN} from '../../seasons/SEASON_TOKEN';
import {GetShadowHistory} from '../../../core/Shadow/Application/UseCase/GetShadowHistory';
import {GetShadowMap} from '../../../core/Shadow/Application/UseCase/GetShadowMap';
import {GetActiveSeasonService} from '../../seasons/services/get-active-season/get-active-season.service';
import {ShadowSearch} from "../../../core/Shadow/Application/UseCase/ShadowSearch";

export const ShadowUseCaseProviders: Provider[] = [
  {
    provide: SHADOW_TOKEN.USECASE.GET_SHADOW,
    useFactory: (get) => {
      return new GetShadow(get);
    },
    inject: [SHADOW_TOKEN.DAOS.GET_SHADOW],
  },
  {
    provide: SHADOW_TOKEN.USECASE.CREATE_SHADOW,
    useFactory: (dao, season) => {
      return new CreateShadow(dao, season);
    },
    inject: [SHADOW_TOKEN.DAOS.CREATE_SHADOW_DAO, SEASON_TOKEN.DAOS.CURRENT_SEASON_DAO],
  },
  {
    provide: SHADOW_TOKEN.USECASE.UPDATE_SHADOW,
    useFactory: (dao, get, season) => {
      return new UpdateShadow(dao, get, season);
    },
    inject: [
      SHADOW_TOKEN.DAOS.UPDATE_SHADOW_DAO,
      SHADOW_TOKEN.DAOS.GET_SHADOW,
      GetActiveSeasonService,
    ],
  },
  {
    provide: SHADOW_TOKEN.USECASE.DELETE_SHADOW,
    useFactory: (dao, get) => {
      return new DeleteShadow(dao, get);
    },
    inject: [SHADOW_TOKEN.DAOS.DELETE_SHADOW_DAO, SHADOW_TOKEN.DAOS.GET_SHADOW],
  },
  {
    provide: SHADOW_TOKEN.USECASE.GET_SHADOW_DETAILS,
    useFactory: (dao) => {
      return new GetShadowHistory(dao);
    },
    inject: [SHADOW_TOKEN.DAOS.SHADOW_DETAILS],
  },
  {
    provide: SHADOW_TOKEN.USECASE.GET_SHADOW_MAP,
    useFactory: (dao) => {
      return new GetShadowMap(dao);
    },
    inject: [SHADOW_TOKEN.DAOS.SHADOW_MAP],
  },

  {
    provide: SHADOW_TOKEN.USECASE.SEARCHER,
    useFactory: (dao) => {
      return new ShadowSearch(dao);
    },
    inject: [SHADOW_TOKEN.DAOS.SEARCHER],
  },
];
