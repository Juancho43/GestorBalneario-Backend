import {SaveClientDAO} from "../../../core/Client/Model/DAO/SaveClientDAO";
import {Client} from "../../../core/Client/Model/Client";
import {GetClientsDAO} from "../../../core/Client/Model/DAO/GetClientsDAO";
import {GetClientsQuery} from "../../../core/Client/Application/DTO/GetClientsQuery";
import {Inject, Injectable} from "@nestjs/common";
import {DB_PROVIDER} from "../../database/DBPROVIDER";
import {StringObject} from "../../../core/common/Model/StringObject";
import {EmailObject} from "../../../core/common/Model/EmailObject";
import {Timestamps} from "../../../core/common/Model/Timestamps";
import {SoftDelete} from "../../../core/common/Model/SoftDelete";
@Injectable()
export class SqliteClientGetMany implements GetClientsDAO {

    constructor(@Inject(DB_PROVIDER) private readonly db: any) {}
       async get(query: GetClientsQuery): Promise<Client[]> {
            const searchTerm = `%${query.query}%`;
            const limit = query.pageSize;
            const offset = (query.page - 1) * limit;

            const rows = this.db.prepare(`
                SELECT * FROM Clients 
                WHERE (name LIKE ? OR email LIKE ? OR phone LIKE ?)
                ORDER BY id 
                LIMIT ? OFFSET ?
            `).all(searchTerm, searchTerm, searchTerm, limit, offset);

            return rows.map(row =>
                Client.create(
                    row.id,
                    StringObject.create(row.name),
                    EmailObject.create(row.email),
                    StringObject.create(row.phone),
                    Timestamps.restore(row.created_at, row.updated_at),
                    SoftDelete.restore(row.deleted_at),
                )
            );
        }
}