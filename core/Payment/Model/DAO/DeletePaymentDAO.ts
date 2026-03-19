export interface DeletePaymentDAO{
    delete(id:string): Promise<boolean>;
}