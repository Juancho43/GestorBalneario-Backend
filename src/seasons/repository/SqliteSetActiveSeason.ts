import {Injectable} from '@nestjs/common';
import {SetActiveSeasonDAO} from '../../../core/Season/Application/Interfaces/SetActiveSeasonDAO';
import {SqliteBaseClass} from '../../database/SqliteBaseClass';
import {SetActiveSeasonCommand} from 'core/Season/Application/Commads/SetActiveSeasonCommand';

@Injectable()
export class SqliteSetActiveSeason
  extends SqliteBaseClass
  implements SetActiveSeasonDAO
{
  async set(command: SetActiveSeasonCommand): Promise<void> {
    const sql = `
        UPDATE Seasons
        SET isActive = 0;
        `;
    const sqlActivate = `
            UPDATE Seasons
            SET isActive = 1
            WHERE id = @id AND deleted_at IS NULL ;
        `;

    const stmtDesactivate = this.getDb().prepare(sql);
    const stmtActivate = this.getDb().prepare(sqlActivate);
    const transaction = this.getDb().transaction((id: string) => {
      stmtDesactivate.run();
      stmtActivate.run({ id: id });
    });
    transaction(command.seasonId);
  }
}
