import { Module } from '@nestjs/common';
import {CreateShadowController} from "./controllers/create-shadow/create-shadow.controller";
import {EditShadowController} from "./controllers/edit-shadow/edit-shadow.controller";
import {DeleteShadowController} from "./controllers/delete-shadow/delete-shadow.controller";
import {GetByIdShadowController} from "./controllers/get-by-id-shadow/get-by-id-shadow.controller";
import {GetShadowService} from "./services/get-shadow/get-shadow.service";
import {CreateShadowService} from "./services/create-shadow/create-shadow.service";
import {EditShadowService} from "./services/edit-shadow/edit-shadow.service";
import {DeleteShadowService} from "./services/delete-shadow/delete-shadow.service";

@Module({
    controllers: [CreateShadowController, EditShadowController, DeleteShadowController, GetByIdShadowController],
    providers: [CreateShadowService, EditShadowService, DeleteShadowService, GetShadowService],
})
export class ShadowModule {}
