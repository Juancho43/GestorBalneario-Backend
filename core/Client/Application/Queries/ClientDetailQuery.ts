export class ClientDetailQuery {
    clientId: string;
    limit: string;
    offset: string;

    constructor(clientId: string, limit: string, offset: string) {
        this.clientId = clientId;
        this.limit = limit;
        this.offset = offset;
    }
}