import {Client} from "../../Model/Client";

export class ClientResponse{
    /**
     * Unique identifier for the client
     * @example "client-123"
     * */
    id: string;
    /**
     * Client's full name
     * @example Juan Bravo
     * */
    name: string;
    /**
     * Client's phone number
     * @example "+1-555-123-4567"
     * */
    phone: string;
    /**
     * Client's email
     * @example "client@example.com"
     * */
    email: string;
    static create(client: Client){
        return{
            id:client.id,
            name: client.name.getValue(),
            phone: client.phone.getValue(),
            email: client.email.getValue(),
        }
    }
    static createList(clients: Client[]){
        return clients.map((client) => {
            return this.create(client);
        })
    }
}