export interface DeleteShadowDAO {
    delete(id: string): Promise<boolean>;
}