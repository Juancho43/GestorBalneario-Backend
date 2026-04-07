import {BaseError} from "../BaseError";

export class EntityNotFoundError extends BaseError {
    constructor(entity: string, id: string) {
        super(`Entity ${entity} with id ${id} not found`,404);
    }
}