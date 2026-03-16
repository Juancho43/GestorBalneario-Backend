export class GetCurrentReservationsQuery{
    constructor(
        public query: string,
        public page: number,
        public pageSize: number,
    ) {
    }
}