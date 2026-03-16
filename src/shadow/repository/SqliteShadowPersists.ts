import {PersistShadow} from "../../../core/Shadow/Model/PersistShadow";
import {Shadow} from "../../../core/Shadow/Model/Shadow";
import {Inject, Injectable} from "@nestjs/common";
import {DB_PROVIDER} from "../../database/DBPROVIDER";
@Injectable()
export class SqliteShadowPersists implements PersistShadow{

    constructor(@Inject(DB_PROVIDER) private readonly db: any) {}

    async save(shadow: Shadow): Promise<void> {
        const stmt = this.db.prepare(
            `INSERT OR REPLACE INTO Shadows (id, identifier, type, state, x, y) 
             VALUES (@id, @identifier, @type, @state, @x, @y)`
        );
        stmt.run({
            id: shadow.id,
            identifier: shadow.identifier.getValue(),
            type: shadow.type.type,
            state: shadow.state.state,
            x: shadow.coords.getX(),
            y: shadow.coords.getY()
        });
    }

    async update(shadow: Shadow): Promise<boolean> {
        console.log('Updating shadow');
        console.log('Shadow to persist:', shadow)
        const stmt = this.db.prepare(`
        UPDATE Shadows 
        SET identifier = @identifier, 
            type = @type, 
            state = @state, 
            x = @x, 
            y = @y 
        WHERE id = @id
    `);
        const result = stmt.run({
            id: shadow.id,
            identifier: shadow.identifier.getValue(),
            type: shadow.type.type,
            state: shadow.state.state,
            x: shadow.coords.getX(),
            y: shadow.coords.getY()
        });
        console.log('Result', result);

        return result.changes > 0;
    }

}