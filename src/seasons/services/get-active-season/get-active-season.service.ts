import {Inject, Injectable, Logger} from '@nestjs/common';
import {GetActiveSeason} from '../../../../core/Season/Application/UseCase/GetActiveSeason';
import {SeasonResponse} from '../../../../core/Season/Application/DTO/SeasonResponse';
import {ActiveSeasonDAO} from '../../../../core/Season/Application/Interfaces/ActiveSeasonDAO';
import {UUID} from '../../../../core/common/Model/UUID';
import {StringObject} from '../../../../core/common/Model/StringObject';
import {Timestamps} from '../../../../core/common/Model/Timestamps';
import {SoftDelete} from '../../../../core/common/Model/SoftDelete';
import {Season} from 'core/Season/Model/Season';
import {SEASON_TOKEN} from 'src/seasons/SEASON_TOKEN';

@Injectable()
export class GetActiveSeasonService implements ActiveSeasonDAO {
  private logger = new Logger(GetActiveSeasonService.name);
  private season: SeasonResponse | null = null;

  constructor(
    @Inject(SEASON_TOKEN.USECASE.CURRENT_SEASON)
    private useCase: GetActiveSeason,
  ) {}

  async get(): Promise<Season> {
    if (!this.season) {
      await this.execute();
    }
    const season = Season.create(
      UUID.restore(this.season!.id),
      this.season!.isActive,
      new Date(this.season!.startDate),
      new Date(this.season!.endDate),
      StringObject.create(this.season!.name),
      Timestamps.create(),
      SoftDelete.empty(),
    );
    return Promise.resolve(season);
  }

  async execute() {
    try {
      this.logger.debug('Getting current season');
      this.season = await this.useCase.execute(null);
      return this.season;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
