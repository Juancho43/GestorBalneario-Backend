import {Inject, Injectable, Logger} from '@nestjs/common';
import type {GetActiveSeasonDAO} from "../../../../core/Season/Application/Interfaces/GetActiveSeasonDAO";
import {GetActiveSeason} from "../../../../core/Season/Application/UseCase/GetActiveSeason";
import {SeasonResponse} from "../../../../core/Season/Application/DTO/SeasonResponse";
import {ActiveSeason} from "../../../../core/Season/Application/Interfaces/ActiveSeason";
import { Season } from "core/Season/Model/Season";
@Injectable()
export class GetActiveSeasonService implements ActiveSeason {
    private logger = new Logger(GetActiveSeasonService.name);
    private useCase: GetActiveSeason;
    private season: SeasonResponse | null = null;

    constructor(@Inject('GET_ACTIVE') dao: GetActiveSeasonDAO) {
        this.useCase = new GetActiveSeason(dao);
    }

    async get(): Promise<Season> {
        if (!this.season) {
            await this.execute();
        }
        const season = Season.create(
            UUID.restore(this.season!.id),
            new Date(this.season!.startDate),
            new Date(this.season!.endDate),
            StringObject.create(this.season!.name),
            Timestamps.create(),
                SoftDelete.empty()

        )
        return Promise.resolve(season);
    }


    async execute(){
        try {
            this.logger.debug('Getting current season')
            this.season = await this.useCase.execute(null);
            return this.season!;
        }catch (e) {
            this.logger.error(e);
            throw e;
        }
    }
}

import {UUID} from "../../../../core/common/Model/UUID";
import {StringObject} from "../../../../core/common/Model/StringObject";
import {Timestamps} from "../../../../core/common/Model/Timestamps";
import {SoftDelete} from "../../../../core/common/Model/SoftDelete";
