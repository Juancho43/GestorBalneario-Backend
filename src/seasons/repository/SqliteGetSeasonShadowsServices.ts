import {Injectable} from '@nestjs/common';
import {SqliteBaseClass} from '../../database/SqliteBaseClass';
import {GetSeasonShadowsServicesDAO} from '../../../core/Season/Application/Interfaces/GetSeasonShadowsServicesDAO';
import {SeasonShadowsServicesDTO} from 'core/Season/Application/DTO/SeasonShadowsServicesDTO';
import {UUID} from '../../../core/common/Model/UUID';
import {Season} from '../../../core/Season/Model/Season';
import {SoftDelete} from '../../../core/common/Model/SoftDelete';
import {Timestamps} from '../../../core/common/Model/Timestamps';
import {Service} from '../../../core/Service/Model/Service';
import {Shadow} from '../../../core/Shadow/Model/Shadow';
import {StringObject} from '../../../core/common/Model/StringObject';
import {ShadowType} from '../../../core/Shadow/Model/ValueObjects/ShadowType';
import {Coords} from '../../../core/common/Model/Coords';
import {Money} from '../../../core/Payment/Model/Money';
import {ServiceCategory} from "../../../core/Service/ServiceCategory";

@Injectable()
export class SqliteGetSeasonShadowsServices
  extends SqliteBaseClass
  implements GetSeasonShadowsServicesDAO
{
  async get(seasonId: string): Promise<SeasonShadowsServicesDTO> {
    const sql = `
           SELECT 
               s.id AS seasonId,    
               s.name AS seasonName,
               s.isActive AS seasonIsActive,
               s.startDate AS seasonStartDate,
               s.endDate AS seasonEndDate,
               s.created_at AS seasonCreatedAt,
               s.updated_at AS seasonUpdatedAt,
               shadows.id AS shadowId,
               shadows.identifier AS shadowIdentifier,
               shadows.type AS shadowType,
               shadows.x,
               shadows.y,
               shadows.created_at AS shadowCreatedAt,
               shadows.updated_at AS shadowUpdatedAt,
               services.id AS serviceId,
               services.price AS servicePrice,
               services.description AS serviceName,
                services.type AS serviceType,
               services.created_at AS serviceCreatedAt,
               services.updated_at AS serviceUpdatedAt
           FROM Seasons s 
               INNER JOIN Season_Shadows AS sha ON sha.seasonId = s.id
               INNER JOIN Season_Services AS se ON se.seasonId = s.id
               INNER JOIN Shadows AS shadows ON sha.shadowId = shadows.id
               INNER JOIN Services AS services ON se.serviceId = services.id
               WHERE s.id = @id AND s.deleted_at IS NULL 
        `;
    const stmt = this.getDb().prepare(sql).all({ id: seasonId }) as any[];
    const dto = new SeasonShadowsServicesDTO();
    const seasonRow = stmt[0];
    dto.season = Season.create(
      UUID.restore(seasonRow.seasonId),
      seasonRow.seasonActive === 1,
      new Date(seasonRow.seasonStartDate),
      new Date(seasonRow.seasonEndDate),
      StringObject.create(seasonRow.seasonName),
      Timestamps.restore(seasonRow.seasonCreatedAt, seasonRow.seasonUpdatedAt),
      SoftDelete.empty(),
    );
    const shadowsMap = new Map<string, Shadow>();
    const servicesMap = new Map<string, Service>();
    stmt.forEach((row) => {
      if (!shadowsMap.has(row.shadowId)) {
        shadowsMap.set(
          row.shadowId,
          Shadow.create(
            UUID.restore(row.shadowId),
            UUID.restore(row.seasonId),
            StringObject.create(row.shadowIdentifier),
            ShadowType.create(row.shadowType),
            Coords.create(row.x, row.y),
            Timestamps.restore(row.shadowCreatedAt, row.shadowUpdatedAt),
            SoftDelete.empty(),
          ),
        );
      }
      if (!servicesMap.has(row.serviceId)) {
        servicesMap.set(
          row.serviceId,
          Service.create(
            UUID.restore(row.serviceId),
            UUID.restore(row.seasonId),
            StringObject.create(row.serviceName),
            Money.create(row.servicePrice),
            ServiceCategory.create(row.serviceCategory),
            Timestamps.restore(row.serviceCreatedAt, row.serviceUpdatedAt),
            SoftDelete.empty(),
          ),
        );
      }
    });
    dto.shadows = Array.from(shadowsMap.values());
    dto.services = Array.from(servicesMap.values());
    return dto;
  }
}
