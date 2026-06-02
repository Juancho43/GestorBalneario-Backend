import {Module} from '@nestjs/common';
import {CreateShadowController} from './controllers/create-shadow/create-shadow.controller';
import {EditShadowController} from './controllers/edit-shadow/edit-shadow.controller';
import {DeleteShadowController} from './controllers/delete-shadow/delete-shadow.controller';
import {GetByIdShadowController} from './controllers/get-by-id-shadow/get-by-id-shadow.controller';
import {GetShadowService} from './services/get-shadow/get-shadow.service';
import {CreateShadowService} from './services/create-shadow/create-shadow.service';
import {EditShadowService} from './services/edit-shadow/edit-shadow.service';
import {DeleteShadowService} from './services/delete-shadow/delete-shadow.service';
import {ShadowHistoryController} from './controllers/shadow-history/shadow-history.controller';
import {GetShadowMapService} from './services/get-shadow-map/get-shadow-map.service';
import {GetShadowMapController} from './controllers/get-shadow-map/get-shadow-map.controller';
import {GetShadowHistoryService} from './services/get-shadow-history/get-shadow-history.service';
import {SeasonModule} from '../seasons/season.module';
import {SHADOW_TOKEN} from './SHADOW_TOKEN';
import {ShadowDaoProviders} from './providers/ShadowDaoProviders';
import {ShadowUseCaseProviders} from './providers/ShadowUseCaseProviders';
import {ShadowSearcherController} from './controllers/shadow-searcher/shadow-searcher.controller';
import {ShadowSearcherService} from './services/shadow-searcher/shadow-searcher.service';

@Module({
  imports: [SeasonModule],
  controllers: [
    CreateShadowController,
    EditShadowController,
    DeleteShadowController,
    GetByIdShadowController,
    ShadowHistoryController,
    GetShadowMapController,
    ShadowSearcherController,
  ],
  providers: [
    ...ShadowDaoProviders,
    ...ShadowUseCaseProviders,
    CreateShadowService,
    EditShadowService,
    DeleteShadowService,
    GetShadowService,
    GetShadowMapService,
    GetShadowHistoryService,
    ShadowSearcherService,
  ],
  exports: [SHADOW_TOKEN.DAOS.GET_SHADOW],
})
export class ShadowModule {}
