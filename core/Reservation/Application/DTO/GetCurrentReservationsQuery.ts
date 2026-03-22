export class GetCurrentReservationsQuery{
    constructor(
        public id: string,
        public page: number,
        public pageSize: number,
    ) {
    }
}