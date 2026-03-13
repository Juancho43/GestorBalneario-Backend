export interface IUseCase<T,J> {
    execute(request: T): Promise<J>;
}