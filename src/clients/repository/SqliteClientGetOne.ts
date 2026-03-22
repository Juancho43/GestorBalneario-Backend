import {Client} from "../../../core/Client/Model/Client";
import {GetClientDAO} from "../../../core/Client/Model/DAO/GetClientDAO";
import {Inject, Injectable} from "@nestjs/common";
import {DB_PROVIDER} from "../../database/DBPROVIDER";
import {StringObject} from "../../../core/common/Model/StringObject";
import {EmailObject} from "../../../core/common/Model/EmailObject";
import {Timestamps} from "../../../core/common/Model/Timestamps";
import {SoftDelete} from "../../../core/common/Model/SoftDelete";
@Injectable()
export class SqliteClientGetOne implements GetClientDAO {

    constructor(@Inject(DB_PROVIDER) private readonly db: any) {}
    async get(id: string): Promise<Client | null> {
        const row = this.db.prepare('SELECT * FROM Clients WHERE id = ?').get(id);
        let result : Client | null = null;
        if (row) {
            result = Client.create(
                row.id,
                StringObject.create(row.name),
                EmailObject.create(row.email),
                StringObject.create(row.phone),
                Timestamps.restore(row.created_at, row.updated_at),
                SoftDelete.restore(row.deleted_at),
            );
        }
        return result;
    }
}