import {SqliteBaseClass} from "../../database/SqliteBaseClass";
import {CreateServiceDAO} from "../../../core/Service/Model/DAO/CreateServiceDAO";
import {Service} from "../../../core/Service/Model/Service";
import {Injectable} from "@nestjs/common";
@Injectable()
export class SqliteCreateService extends SqliteBaseClass implements CreateServiceDAO{
    async create(service: Service): Promise<void> {
        const sql=`
        INSERT INTO Services (id,description,price,created_at,updated_at)
            VALUES (:id, :name, :price, :createdAt,:updatedAt)
    `;
        const stmt = this.getDb().prepare(sql);
        stmt.run({
            id: service.id.value,
            name: service.name.getValue(),
            price: service.price.finalAmount,
            createdAt: service.timestamp.createdAt.toISOString(),
            updatedAt: service.timestamp.updatedAt.toISOString(),
        })
    }
}