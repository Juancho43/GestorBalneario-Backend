import { Reservation } from "core/Reservation/Model/Reservation";
import {CreateReservationDAO} from "../../../core/Reservation/Model/DAO/CreateReservationDAO";
import {Inject, Injectable} from "@nestjs/common";
import {DB_PROVIDER} from "../../database/DBPROVIDER";
import {UpdateReservationDAO} from "../../../core/Reservation/Model/DAO/UpdateReservationDAO";
import {GetReservationDAO} from "../../../core/Reservation/Model/DAO/GetReservationDAO";
import {GetCurrentReservationsDAO} from "../../../core/Reservation/Model/DAO/GetCurrentReservationsDAO";
import { GetCurrentReservationsQuery } from "core/Reservation/Application/DTO/GetCurrentReservationsQuery";

@Injectable()
export class SqliteGetCurrentReservation implements GetCurrentReservationsDAO {

    constructor(@Inject(DB_PROVIDER) private readonly db: any) {
    }

    get(query: GetCurrentReservationsQuery): Promise<Reservation[]> {
        throw new Error("Method not implemented.");
    }


}