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
import {SqliteShadowPersists} from "./repository/SqliteShadowPersists";
import {SqliteShadowGetById} from "./repository/SqliteShadowGetById";
import {GetCurrentShadowsService} from "./services/get-current-shadows/get-current-shadows.service";
import {SqliteShadowsGetCurrent} from "./repository/SqliteShadowsGetCurrent";
import {GetCurrentShadowsController} from "./controllers/get-current-shadows/get-current-shadows.controller";

@Module({
    controllers: [CreateShadowController, EditShadowController, DeleteShadowController, GetByIdShadowController, GetCurrentShadowsController],
    providers: [
        {
            provide: 'DELETE_SHADOW_INTERFACE',
            useClass: SqliteShadowDelete,
        },
        {
            provide: 'PERSIST_SHADOW_INTERFACE',
            useClass: SqliteShadowPersists,
        },
        {
            provide: 'GET_SHADOW_INTERFACE',
            useClass: SqliteShadowGetById,
        },
        {
            provide: 'GET_ALL_SHADOW_INTERFACE',
            useClass: SqliteShadowsGetCurrent,
        },
        CreateShadowService, EditShadowService, DeleteShadowService, GetShadowService, GetCurrentShadowsService],
})
export class ShadowModule {}
