export interface DeleteShadowById {
    delete(id: string): Promise<boolean>;
}