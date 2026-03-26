export class GetShadowHistoryQuery{
    id:string;
    page:number;
    pageSize:number;

    constructor(id: string, page: number, pageSize: number) {
        this.id = id;
        this.page = page;
        this.pageSize = pageSize;
    }
}