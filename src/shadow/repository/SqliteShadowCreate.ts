import {SqliteBaseClass} from "../../database/SqliteBaseClass";
import {CreateShadowDAO} from "../../../core/Shadow/Model/DAO/CreateShadowDAO";
import {Shadow} from "../../../core/Shadow/Model/Shadow";
import {Injectable} from "@nestjs/common";
@Injectable()
export class SqliteShadowCreate extends SqliteBaseClass implements CreateShadowDAO{
    async save(shadow: Shadow): Promise<void> {
        const stmt = this.getDb().prepare(
            `INSERT OR REPLACE INTO Shadows (id, identifier, type, x, y,created_at,updated_at) 
             VALUES (@id, @identifier, @type, @x, @y, @created_at, @updated_at)`
        );
        stmt.run({
            id: shadow.id.value,
            identifier: shadow.identifier.getValue(),
            type: shadow.type.type,
            x: shadow.coords.getX(),
            y: shadow.coords.getY(),
            created_at:shadow.timestamp.createdAt.toISOString(),
            updated_at:shadow.timestamp.updatedAt.toISOString(),
        });
    }

}