export interface DeleteShadowById {
    delete(id: number): Promise<void>;
}