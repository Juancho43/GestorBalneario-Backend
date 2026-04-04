export class ClientSearchQuery {
    constructor(query: string, limit: number, offset: number) {
        this.query = query;
        this.limit = limit;
        this.offset = offset;
    }
    query:string;
    limit:number;
    offset:number;
}