import { Reservation } from "core/Reservation/Model/Reservation";
import {CreateReservationDAO} from "../../../core/Reservation/Model/DAO/CreateReservationDAO";
import {Inject, Injectable} from "@nestjs/common";
import {DB_PROVIDER} from "../../database/DBPROVIDER";

@Injectable()
export class SqliteCreateReservation implements CreateReservationDAO {

    constructor(@Inject(DB_PROVIDER) private readonly db: any) {}
    save(reservation: Reservation): Promise<void> {
        throw new Error("Method not implemented.");
    }

}