import {SaveClientDAO} from "../../../core/Client/Model/DAO/SaveClientDAO";
import {Client} from "../../../core/Client/Model/Client";
import {DeleteClientDAO} from "../../../core/Client/Model/DAO/DeleteClientDAO";
import {Inject, Injectable} from "@nestjs/common";
import {DB_PROVIDER} from "../../database/DBPROVIDER";
@Injectable()
export class SqliteClientDelete implements DeleteClientDAO {

    constructor(@Inject(DB_PROVIDER) private readonly db: any) {}
    delete(id: string): Promise<boolean> {
        const result = this.db.prepare('DELETE FROM Clients WHERE id = ?').run(id);
        return result.changes;
    }
}