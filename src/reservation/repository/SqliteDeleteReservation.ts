import { Reservation } from "core/Reservation/Model/Reservation";
import {CreateReservationDAO} from "../../../core/Reservation/Model/DAO/CreateReservationDAO";
import {Inject, Injectable} from "@nestjs/common";
import {DB_PROVIDER} from "../../database/DBPROVIDER";
import {UpdateReservationDAO} from "../../../core/Reservation/Model/DAO/UpdateReservationDAO";

@Injectable()
export class SqliteDeleteReservation implements UpdateReservationDAO {

    constructor(@Inject(DB_PROVIDER) private readonly db: any) {}
    update(reservation: Reservation): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

}