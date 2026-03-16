import { Reservation } from "core/Reservation/Model/Reservation";
import {CreateReservationDAO} from "../../../core/Reservation/Model/DAO/CreateReservationDAO";
import {Inject, Injectable} from "@nestjs/common";
import {DB_PROVIDER} from "../../database/DBPROVIDER";
import {UpdateReservationDAO} from "../../../core/Reservation/Model/DAO/UpdateReservationDAO";
import {GetReservationDAO} from "../../../core/Reservation/Model/DAO/GetReservationDAO";

@Injectable()
export class SqliteGetReservation implements GetReservationDAO {

    constructor(@Inject(DB_PROVIDER) private readonly db: any) {}

    get(id: string): Promise<Reservation | null> {
        throw new Error("Method not implemented.");
    }

}