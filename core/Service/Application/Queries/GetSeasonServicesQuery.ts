export class GetSeasonServicesQuery {
    seasonId: string;
    page:number = 0;
    limit:number = 10;

    constructor(seasonId: string, page: number, limit: number) {
        this.seasonId = seasonId;
        this.page = page;
        this.limit = limit;
    }
}