import {SqliteBaseClass} from "../../database/SqliteBaseClass";
import {GetServicesDAO} from "../../../core/Service/Model/DAO/GetServicesDAO";
import {Service} from "../../../core/Service/Model/Service";
import {Injectable} from "@nestjs/common";
import {Money} from "../../../core/Payment/Model/Money";
import {UUID} from "../../../core/common/Model/UUID";
import {StringObject} from "../../../core/common/Model/StringObject";
import {Timestamps} from "../../../core/common/Model/Timestamps";
import {SoftDelete} from "../../../core/common/Model/SoftDelete";
@Injectable()
export class SqliteGetServices extends SqliteBaseClass implements GetServicesDAO{
    async get(): Promise<Service[]> {
        const sql = `SELECT *
                     FROM Services
                     WHERE deleted_at IS NULL
                     ORDER BY created_at DESC
                     LIMIT @limit OFFSET @offset
        `;
        const stmt = this.getDb().prepare(sql);
        const result = stmt.all({limit: 10,offset:0}) as any;
        let data: Service[] =[];
        if (result) {
            result.forEach((row) => {
                const service=  Service.create(
                    UUID.restore(row.id),
                    StringObject.create(row.description),
                    Money.create(row.price),
                    Timestamps.restore(new Date(row.created_at), new Date(row.updated_at)),
                    SoftDelete.empty()
                )
                data.push(service);
            })

        }
        return data;
    }

}