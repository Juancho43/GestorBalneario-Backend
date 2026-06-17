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
import {SeasonSearcherController} from './controllers/season-searcher/season-searcher.controller';
import {SeasonSearcherService} from './services/season-searcher/season-searcher.service';
import { SeasonsClientsDebtController } from './controllers/seasons-clients-debt/seasons-clients-debt.controller';
import { SeasonsClientsDebtService } from './services/seasons-clients-debt/seasons-clients-debt.service';
import { GetSeasonDetailsController } from './controllers/get-season-details/get-season-details.controller';
import { GetSeasonDetailsService } from './services/get-season-details/get-season-details.service';

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
    SeasonSearcherController,
    SeasonsClientsDebtController,
    GetSeasonDetailsController,
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
    SeasonSearcherService,
    SeasonsClientsDebtService,
    GetSeasonDetailsService,
  ],
  exports: [GetActiveSeasonService, SEASON_TOKEN.DAOS.CURRENT_SEASON_DAO],
})
export class SeasonModule {}
