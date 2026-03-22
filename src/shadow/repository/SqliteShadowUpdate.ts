import {SqliteBaseClass} from "../../database/SqliteBaseClass";
import {UpdateShadowDAO} from "../../../core/Shadow/Model/DAO/UpdateShadowDAO";
import {Shadow} from "../../../core/Shadow/Model/Shadow";
import {Injectable} from "@nestjs/common";
@Injectable()
export class SqliteShadowUpdate extends SqliteBaseClass implements UpdateShadowDAO{
    async update(shadow: Shadow): Promise<boolean> {
        const stmt = this.getDb().prepare(`
        UPDATE Shadows 
        SET identifier = @identifier, 
            type = @type, 
            x = @x, 
            y = @y 
        WHERE id = @id
    `);
        const result = stmt.run({
            id: shadow.id,
            identifier: shadow.identifier.getValue(),
            type: shadow.type.type,
            x: shadow.coords.getX(),
            y: shadow.coords.getY()
        });
        console.log('Result', result);

        return result.changes > 0;
    }

}