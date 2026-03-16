export interface DeleteReservationDAO{
    delete(id: string): Promise<boolean>;
}