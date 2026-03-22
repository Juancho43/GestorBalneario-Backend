import {SaveClientDAO} from "../../../core/Client/Model/DAO/SaveClientDAO";
import {Client} from "../../../core/Client/Model/Client";
import {Inject, Injectable} from "@nestjs/common";
import {DB_PROVIDER} from "../../database/DBPROVIDER";
@Injectable()
export class SqliteClientCreate implements SaveClientDAO {
    constructor(@Inject(DB_PROVIDER) private readonly db: any) {}

    async save(client: Client): Promise<void> {
        const stmt = this.db.prepare(
            `INSERT OR REPLACE INTO Clients (id, name, email, phone, created_at, updated_at) 
         VALUES (:id, :name, :email, :phone, :createdAt, :updatedAt)`
        );

        stmt.run({
            id: client.id.value,
            name: client.name.getValue(),
            email: client.email.getValue(),
            phone: client.phone.getValue(),
            createdAt: client.timestamp.createdAt.toISOString(),
            updatedAt: client.timestamp.updatedAt.toISOString(),
        });
    }

}