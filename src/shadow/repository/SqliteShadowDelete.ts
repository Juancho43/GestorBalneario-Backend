import {DeleteShadowDAO} from "../../../core/Shadow/Model/DAO/DeleteShadowDAO";
import {Inject, Injectable} from "@nestjs/common";
import {DB_PROVIDER} from "../../database/DBPROVIDER";
@Injectable()
export class SqliteShadowDelete implements DeleteShadowDAO{

    constructor(@Inject(DB_PROVIDER) private readonly db: any) {}

    delete(id: string): Promise<boolean> {
        const result = this.db.prepare('DELETE FROM Shadows WHERE id = ?').run(id);
        return result.changes;
    }

}