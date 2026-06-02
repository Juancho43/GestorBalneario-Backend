import {Inject, Injectable, Logger} from '@nestjs/common';
import {ShadowSearchQuery} from "../../../../core/Shadow/Application/Queries/ShadowSearchQuery";
import {ShadowResponse} from "../../../../core/Shadow/Application/Response/ShadowResponse";
import {SHADOW_TOKEN} from "../../SHADOW_TOKEN";
import {ShadowSearch} from "../../../../core/Shadow/Application/UseCase/ShadowSearch";

@Injectable()
export class ShadowSearcherService {

    private logger = new Logger(ShadowSearcherService.name);

    constructor(
        @Inject(SHADOW_TOKEN.USECASE.SEARCHER) private useCase: ShadowSearch,
    ) {}

    execute(query: ShadowSearchQuery ): Promise<ShadowResponse[]> {
        try {
            this.logger.debug('Executing ShadowSearcherService', query);
            return this.useCase.execute(query);
        } catch (error) {
            this.logger.error(error);
            throw error;
        }
    }
}
