import {SaveClientDAO} from "../../../core/Client/Model/DAO/SaveClientDAO";
import {Client} from "../../../core/Client/Model/Client";
import {GetClientsDAO} from "../../../core/Client/Model/DAO/GetClientsDAO";
import {GetClientsQuery} from "../../../core/Client/Application/DTO/GetClientsQuery";
import {Inject, Injectable} from "@nestjs/common";
import {DB_PROVIDER} from "../../database/DBPROVIDER";
import {StringObject} from "../../../core/common/Model/StringObject";
import {EmailObject} from "../../../core/common/Model/EmailObject";
@Injectable()
export class SqliteClientGetMany implements GetClientsDAO {

    constructor(@Inject(DB_PROVIDER) private readonly db: any) {}
    get(query: GetClientsQuery): Promise<Client[]> {
        const searchTerm = `%${query.query}%`; // 'query' es lo que el usuario escribe
        const limit = query.pageSize;                // Cantidad de resultados por página
        const offset = (query.page - 1) * limit; // 'page' es el número de página (1, 2, 3...)

        const rows = this.db.prepare(`
            SELECT * FROM client
            WHERE name LIKE ?
               OR email LIKE ?
               OR phone LIKE ?
            ORDER BY id ASC
                LIMIT ? OFFSET ?
        `).all(searchTerm, searchTerm, searchTerm, limit, offset);

        return rows.map(row =>
            Client.create(
                row.id,
                StringObject.create(row.name),
                EmailObject.create(row.email),
                StringObject.create(row.phone),
            )
        );
    }
}