import {Injectable} from "@nestjs/common";
import {SqliteBaseClass} from "../../database/SqliteBaseClass";
import {CloneSeasonDAO} from "../../../core/Season/Application/Interfaces/CloneSeasonDAO";
import { CloneSeasonDTO } from "core/Season/Application/DTO/CloneSeasonDTO";
import {UUID} from "../../../core/common/Model/UUID";

@Injectable()
export class SqliteCloneSeason extends SqliteBaseClass implements CloneSeasonDAO {
    async save(dto: CloneSeasonDTO): Promise<void> {
        const stmtSeason = this.getDb().prepare(`
            INSERT INTO Seasons (id,startDate,endDate,name,created_at,updated_at,isActive)
            VALUES (@id,@start,@end,@name,@createdAt,@updatedAt,@isActive)
        `);
        const stmtShadowSeason = this.getDb().prepare(`
            INSERT INTO Season_Shadows (id, seasonId, shadowId) values (@id, @seasonId, @shadowId)
        `)
        const stmtShadow = this.getDb().prepare(
            `INSERT OR REPLACE INTO Shadows (id, identifier, type, x, y,created_at,updated_at)
             VALUES (@id, @identifier, @type, @x, @y, @createdAt, @updatedAt)`
        );
        const stmtServiceSeason = this.getDb().prepare(`
            INSERT INTO Season_Services (id,seasonId,serviceId)
            VALUES (@id, @seasonId, @serviceId)
        `)
        const stmtService = this.getDb().prepare(`
            INSERT INTO Services (id,description,price,created_at,updated_at)
            VALUES (:id, :name, :price, :createdAt,:updatedAt)`)

        const stmtDetectiveSeason = this.getDb().prepare(`
            UPDATE Seasons SET isActive = 0 WHERE isActive = 1 
        `)
        const mainTransaction = this.getDb().transaction(()=>{
            stmtDetectiveSeason.run({});
            stmtSeason.run({
                id:dto.season.id.value,
                start: dto.season.startDate.toISOString(),
                end: dto.season.endDate.toISOString(),
                name: dto.season.name.getValue(),
                createdAt: dto.season.timestamps.createdAt.toISOString(),
                updatedAt: dto.season.timestamps.updatedAt.toISOString(),
                isActive: 1
            })
            dto.shadows.forEach(shadow => {
                stmtShadow.run({
                    id: shadow.id.value,
                    identifier: shadow.identifier.getValue(),
                    type: shadow.type.type,
                    x: shadow.coords.getX(),
                    y: shadow.coords.getY(),
                    createdAt: shadow.timestamp.createdAt.toISOString(),
                    updatedAt: shadow.timestamp.updatedAt.toISOString(),
                })
                stmtShadowSeason.run({
                    id: UUID.create().value,
                    seasonId: dto.season.id.value,
                    shadowId: shadow.id.value,
                })
            })
            dto.services.forEach(service => {
                stmtService.run({
                    id: service.id.value,
                    name: service.name.getValue(),
                    price: service.price.amount,
                    createdAt: service.timestamp.createdAt.toISOString(),
                    updatedAt: service.timestamp.updatedAt.toISOString(),
                });
                stmtServiceSeason.run({
                    id: UUID.create().value,
                    seasonId: dto.season.id.value,
                    serviceId: service.id.value,
                });
            });
        })
        mainTransaction();
    }
}