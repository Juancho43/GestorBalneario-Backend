import {Client} from "../../Model/Client";

export class ClientResponse{
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