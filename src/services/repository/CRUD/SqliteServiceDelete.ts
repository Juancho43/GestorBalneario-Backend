import {Injectable} from '@nestjs/common';
import {SqliteBaseClass} from '../../../database/SqliteBaseClass';
import {DeleteServiceDAO} from '../../../../core/Service/Model/DAO/DeleteServiceDAO';
import {Service} from 'core/Service/Model/Service';

@Injectable()
export class SqliteServiceDelete
  extends SqliteBaseClass
  implements DeleteServiceDAO
{
  async delete(entity: Service): Promise<void> {
    const sql = `UPDATE Services SET deleted_at = @date WHERE id = @id`;
    const result =this.getDb().prepare(sql).run({
      date: entity.getSoftDelete().value!.toISOString(),
      id: entity.getId().value,
    });
    console.log(result)
  }
}
