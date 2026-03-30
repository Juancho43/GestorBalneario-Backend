export class GetClientsQuery{
    constructor(
        public query?: string,
        public page: number = 1,
        public pageSize: number = 10,
    ) {
    }
}