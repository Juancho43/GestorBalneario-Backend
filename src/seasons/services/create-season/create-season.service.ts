import {Inject, Injectable, Logger} from '@nestjs/common';
import {CreateSeason} from "../../../../core/Season/Application/CreateSeason";
import type {CreateSeasonDAO} from "../../../../core/Season/Model/DAO/CreateSeasonDAO";
import {CreateSeasonCommand} from "../../../../core/Season/Application/DTO/CreateSeasonCommand";
import {SeasonResponse} from "../../../../core/Season/Application/DTO/SeasonResponse";

@Injectable()
export class CreateSeasonService {
    private readonly logger = new Logger(CreateSeasonService.name);
    private useCase : CreateSeason;

    constructor(
        @Inject('CREATE_SEASON') dao: CreateSeasonDAO
    ) {
        this.useCase = new CreateSeason(dao);
    }

    async execute(command: CreateSeasonCommand){
        try{
            this.logger.debug('Creating season', command);
            return SeasonResponse.create(await this.useCase.execute(command));
        }catch(error){
            this.logger.error(error);
            return error;
        }
    }
}

