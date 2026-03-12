import {Inject, Injectable} from "@nestjs/common";
import {GetShadow} from "../../../core/Shadow/Model/GetShadow";
import {Shadow} from "../../../core/Shadow/Model/Shadow";
import {DB_PROVIDER} from "../../database/DBPROVIDER";
import {Coords} from "../../../core/common/Model/Coords";
import {StringObject} from "../../../core/common/Model/StringObject";
import {ShadowType} from "../../../core/Shadow/Model/ValueObjects/ShadowType";
import {ShadowState} from "../../../core/Shadow/Model/ValueObjects/ShadowState";

@Injectable()
export class SqliteShadowGetById implements GetShadow{

    constructor(@Inject(DB_PROVIDER) private readonly db: any) {}

    async get(id: string): Promise<Shadow | null> {
        const row = this.db.prepare('SELECT * FROM Shadows WHERE id = ?').get(id);
        let result : Shadow | null = null;
        if (row) {
            result = Shadow.create(
                row.id,
                StringObject.create(row.identifier),
                ShadowType.create(row.type),
                ShadowState.create(row.state),
                Coords.create(row.x, row.y)
            );
        }
        return result;
    }

}