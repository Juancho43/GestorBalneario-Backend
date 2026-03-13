import {Client} from "../../../core/Client/Model/Client";
import {UpdateClientDAO} from "../../../core/Client/Model/DAO/UpdateClientDAO";
import {Inject, Injectable} from "@nestjs/common";
import {DB_PROVIDER} from "../../database/DBPROVIDER";
@Injectable()
export class SqliteClientUpdate implements UpdateClientDAO {

    constructor(@Inject(DB_PROVIDER) private readonly db: any) {}

    async update(client: Client): Promise<boolean> {
        const stmt = this.db.prepare(`
            UPDATE Clients 
            SET name = @name,
                email = @email,
                phone = @phone
            WHERE id = @id
        `);

        const result = stmt.run({
            id: client.id,
            name: client.name.getValue(),
            email: client.email.getValue(),
            phone: client.phone.getValue(),
        });

        return result.changes > 0;
    }

}