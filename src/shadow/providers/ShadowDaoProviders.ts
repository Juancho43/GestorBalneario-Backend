import {Provider} from '@nestjs/common';
import {SqliteGetShadowMap} from '../repository/SqliteGetShadowMap';
import {SqliteGetShadowHistory} from '../repository/SqliteGetShadowHistory';
import {SHADOW_TOKEN} from '../SHADOW_TOKEN';
import {SqliteShadowGetById} from '../repository/CRUD/SqliteShadowGetById';
import {SqliteShadowDelete} from '../repository/CRUD/SqliteShadowDelete';
import {SqliteShadowCreate} from '../repository/CRUD/SqliteShadowCreate';
import {SqliteShadowUpdate} from '../repository/CRUD/SqliteShadowUpdate';

export const ShadowDaoProviders: Provider[] = [
  {
    provide: SHADOW_TOKEN.DAOS.DELETE_SHADOW_DAO,
    useClass: SqliteShadowDelete,
  },
  {
    provide: SHADOW_TOKEN.DAOS.CREATE_SHADOW_DAO,
    useClass: SqliteShadowCreate,
  },
  {
    provide: SHADOW_TOKEN.DAOS.UPDATE_SHADOW_DAO,
    useClass: SqliteShadowUpdate,
  },
  {
    provide: SHADOW_TOKEN.DAOS.GET_SHADOW,
    useClass: SqliteShadowGetById,
  },
  {
    provide: SHADOW_TOKEN.DAOS.SHADOW_MAP,
    useClass: SqliteGetShadowMap,
  },
  {
    provide: SHADOW_TOKEN.DAOS.SHADOW_DETAILS,
    useClass: SqliteGetShadowHistory,
  },
];
