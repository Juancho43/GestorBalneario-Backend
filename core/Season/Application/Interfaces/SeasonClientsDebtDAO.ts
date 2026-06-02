import {GetSeasonQuery} from "../Queries/GetSeasonQuery";
import {Invoice} from "../../../Invoice/Model/Invoice";

export interface SeasonClientsDebtDAO{
    get(query: GetSeasonQuery) : Promise<Invoice[]>;
}