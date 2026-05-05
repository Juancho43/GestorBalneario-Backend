import {Module} from '@nestjs/common';
import {CreateSeasonService} from './services/create-season/create-season.service';
import {GetSeasonService} from './services/get-season/get-season.service';
import {GetSeasonController} from './controllers/get-season/get-season.controller';
import {CreateSeasonController} from './controllers/create-season/create-season.controller';
import {GetActiveSeasonController} from './controllers/get-active-season/get-active-season.controller';
import {GetActiveSeasonService} from './services/get-active-season/get-active-season.service';
import {SetActiveSeasonController} from './controllers/set-active-season/set-active-season.controller';
import {SetActiveSeasonService} from './services/set-active-season/set-active-season.service';
import {CloneSeasonController} from './controllers/clone-season/clone-season.controller';
import {CloneSeasonService} from './services/clone-season/clone-season.service';
import {DeleteSeasonController} from './controllers/delete-season/delete-season.controller';
import {EditSeasonController} from './controllers/edit-season/edit-season.controller';
import {SeasonHistoryController} from './controllers/season-history/season-history.controller';
import {GetSeasonsHistoryService} from './services/get-seasons-history/get-seasons-history.service';
import {DeleteSeasonService} from './services/delete-season/delete-season.service';
import {UpdateSeasonService} from './services/update-season/update-season.service';
import {SEASON_TOKEN} from './SEASON_TOKEN';
import {SeasonDaoProviders} from './providers/SeasonDaoProviders';
import {SeasonUseCaseProviders} from './providers/SeasonUseCaseProviders';

@Module({
  controllers: [
    GetSeasonController,
    CreateSeasonController,
    GetActiveSeasonController,
    SetActiveSeasonController,
    CloneSeasonController,
    DeleteSeasonController,
    EditSeasonController,
    SeasonHistoryController,
  ],
  providers: [
    ...SeasonDaoProviders,
    ...SeasonUseCaseProviders,
    CreateSeasonService,
    GetSeasonService,
    GetActiveSeasonService,
    SetActiveSeasonService,
    GetSeasonsHistoryService,
    CloneSeasonService,
    DeleteSeasonService,
    UpdateSeasonService,
  ],
  exports: [GetActiveSeasonService, SEASON_TOKEN.DAOS.CURRENT_SEASON_DAO],
})
export class SeasonModule {}
