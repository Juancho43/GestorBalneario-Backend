import {GetSeasonsInvoices} from "../../../core/Invoice/Application/UseCase/GetSeasonsInvoices";
import {InvoiceResponse} from "../../../core/Invoice/Application/DTO/InvoiceResponse";
import {vi} from "vitest";
import {GetSeasonInvoicesQuery} from "../../../core/Invoice/Application/Queries/GetSeasonInvoicesQuery";

describe('GetSeasonsInvoices UseCase', () => {
    let mock;
    let useCase: GetSeasonsInvoices;
    let query: GetSeasonInvoicesQuery;
    beforeEach(() => {
        mock = {
            get: vi.fn().mockResolvedValue({} as InvoiceResponse[])
        }
        useCase = new GetSeasonsInvoices(mock);
        query = new GetSeasonInvoicesQuery(0,10,"seasonId",'ALL');
    })
    it('Should return an array of InvoiceResponse',async ()=>{
        await useCase.execute(query);
        expect(mock.get).toHaveBeenCalledWith(query);
    })
})