import {GetSeasonEntityQuery} from "./GetSeasonEntityQuery";

export class GetSeasonServicesQuery extends GetSeasonEntityQuery {

    constructor(page: number, pageSize: number, seasonId: string, public type: string) {
        super(page, pageSize, seasonId);
    }
}