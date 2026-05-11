import {SqliteBaseClass} from '../../../database/SqliteBaseClass';
import {CreateServiceDAO} from '../../../../core/Service/Model/DAO/CreateServiceDAO';
import {Service} from '../../../../core/Service/Model/Service';
import {Injectable} from '@nestjs/common';
import {UUID} from '../../../../core/common/Model/UUID';

@Injectable()
export class SqliteCreateService
  extends SqliteBaseClass
  implements CreateServiceDAO
{
  async save(service: Service): Promise<void> {
    const stmtServiceSeason = this.getDb().prepare(`
            INSERT INTO Season_Services (id,seasonId,serviceId)
            VALUES (@id, @seasonId, @serviceId)
        `);
    const stmtService = this.getDb().prepare(`
            INSERT INTO Services (id,description,price,type,created_at,updated_at)
            VALUES (:id, :name, :price,:type, :createdAt,:updatedAt)`);
    const transaction = this.getDb().transaction(() => {
      stmtService.run({
        id: service.id.value,
        name: service.name.getValue(),
        price: service.price.finalAmount,
        type:service.type.getValue(),
        createdAt: service.timestamp.createdAt.toISOString(),
        updatedAt: service.timestamp.updatedAt.toISOString(),
      });
      stmtServiceSeason.run({
        id: UUID.create().value,
        seasonId: service.seasonId.value,
        serviceId: service.id.value,
      });
    });
    transaction();
  }
}
