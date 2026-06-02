import {Inject, Injectable, Logger} from '@nestjs/common';
import {SeasonSearch} from "../../../../core/Season/Application/UseCase/SeasonSearch";
import {SEASON_TOKEN} from "../../SEASON_TOKEN";
import {SeasonSearchQuery} from "../../../../core/Season/Application/Queries/SeasonSearchQuery";
import {SeasonResponse} from "../../../../core/Season/Application/DTO/SeasonResponse";

@Injectable()
export class SeasonSearcherService {
    private logger = new Logger(SeasonSearcherService.name);

    constructor(
        @Inject(SEASON_TOKEN.USECASE.SEARCHER) private useCase: SeasonSearch,
    ) {}

    execute(query: SeasonSearchQuery): Promise<SeasonResponse[]> {
        try {
            this.logger.debug('Executing SeasonSearcherService', query);
            return this.useCase.execute(query);
        } catch (error) {
            this.logger.error(error);
            throw error;
        }
    }
}
