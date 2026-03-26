export class GetServiceQuery{
    /**
     * Id of the requested service
     * */
    id:string;

    constructor(id: string) {
        this.id = id;
    }
}