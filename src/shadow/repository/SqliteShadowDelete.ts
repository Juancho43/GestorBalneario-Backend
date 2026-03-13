import {DeleteShadowById} from "../../../core/Shadow/Model/DeleteShadowById";
import {Inject, Injectable} from "@nestjs/common";
import {DB_PROVIDER} from "../../database/DBPROVIDER";
@Injectable()
export class SqliteShadowDelete implements DeleteShadowById{

    constructor(@Inject(DB_PROVIDER) private readonly db: any) {}

    delete(id: string): Promise<boolean> {
        const result = this.db.prepare('DELETE FROM Shadows WHERE id = ?').run(id);
        return result.changes;
    }

}