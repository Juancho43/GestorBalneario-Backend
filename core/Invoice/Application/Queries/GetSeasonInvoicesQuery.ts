import {GetSeasonEntityQuery} from "../../../Service/Application/Queries/GetSeasonEntityQuery";

export class GetSeasonInvoicesQuery extends GetSeasonEntityQuery {

    constructor(page: number, pageSize: number, seasonId: string, public state: string) {
        super(page, pageSize, seasonId);
    }
}