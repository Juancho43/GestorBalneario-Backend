export interface DeleteClientDAO{
    delete(id: string): Promise<boolean>;
}