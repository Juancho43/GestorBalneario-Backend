import { Module } from '@nestjs/common';
import {CreateShadowController} from "./controllers/create-shadow/create-shadow.controller";
import {EditShadowController} from "./controllers/edit-shadow/edit-shadow.controller";
import {DeleteShadowController} from "./controllers/delete-shadow/delete-shadow.controller";
import {GetByIdShadowController} from "./controllers/get-by-id-shadow/get-by-id-shadow.controller";
import {GetShadowService} from "./services/get-shadow/get-shadow.service";
import {CreateShadowService} from "./services/create-shadow/create-shadow.service";
import {EditShadowService} from "./services/edit-shadow/edit-shadow.service";
import {DeleteShadowService} from "./services/delete-shadow/delete-shadow.service";
import {SqliteShadowDelete} from "./repository/SqliteShadowDelete";
import {SqliteShadowGetById} from "./repository/SqliteShadowGetById";
import {GetCurrentShadowsService} from "./services/get-current-shadows/get-current-shadows.service";
import {SqliteShadowsGetCurrent} from "./repository/SqliteShadowsGetCurrent";
import {GetCurrentShadowsController} from "./controllers/get-current-shadows/get-current-shadows.controller";
import {SqliteShadowCreate} from "./repository/SqliteShadowCreate";
import {SqliteShadowUpdate} from "./repository/SqliteShadowUpdate";
import { ShadowHistoryController } from './controllers/shadow-history/shadow-history.controller';
import { GetShadowMapService } from './services/get-shadow-map/get-shadow-map.service';
import {GetShadowMapController} from "./controllers/get-shadow-map/get-shadow-map.controller";
import {SqliteGetShadowMap} from "./repository/SqliteGetShadowMap";
import {SqliteGetShadowHistory} from "./repository/SqliteGetShadowHistory";
import {GetShadowHistoryService} from "./services/get-shadow-history/get-shadow-history.service";

@Module({
    controllers: [
        CreateShadowController,
        EditShadowController,
        DeleteShadowController,
        GetByIdShadowController,
        GetCurrentShadowsController,
        ShadowHistoryController,
        GetShadowMapController
    ],
    providers: [
        {
            provide: 'DELETE_SHADOW_INTERFACE',
            useClass: SqliteShadowDelete,
        },
        {
            provide: 'CREATE_SHADOW_INTERFACE',
            useClass: SqliteShadowCreate,
        },
        {
            provide:'UPDATE_SHADOW_INTERFACE',
            useClass:SqliteShadowUpdate
        },
        {
            provide: 'GET_SHADOW_INTERFACE',
            useClass: SqliteShadowGetById,
        },
        {
            provide: 'GET_ALL_SHADOW_INTERFACE',
            useClass: SqliteShadowsGetCurrent,
        },
        {
          provide: 'GET_SHADOW_MAP',
          useClass: SqliteGetShadowMap
        },
        {
         provide:'GET_SHADOW_HISTORY',
         useClass:SqliteGetShadowHistory,
        },
        CreateShadowService,
        EditShadowService,
        DeleteShadowService,
        GetShadowService,
        GetCurrentShadowsService,
        GetShadowMapService,
        GetShadowHistoryService
    ],
})
export class ShadowModule {}
