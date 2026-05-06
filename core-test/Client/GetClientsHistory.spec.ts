import {vi} from "vitest";
import {GetClientsHistory} from "../../core/Client/Application/UseCase/GetClientsHistory";
import {Client} from "../../core/Client/Model/Client";
import {PaginatedQuery} from "../../core/common/Application/PaginatedQuery";
import {ClientMother} from "../mothers/ClientMother";

describe('GetClientsHistory UseCase', () => {
    let mockDao;
    let useCase: GetClientsHistory;
    let query: PaginatedQuery;
    let dto: Client[] = [];

    beforeEach(() => {

        dto = []
        for(let i =0; i<10; i++){
            dto.push(ClientMother.create())
        }
        mockDao = {
            get: vi.fn().mockResolvedValue(dto),
        };
        useCase = new GetClientsHistory(mockDao);
        query = new PaginatedQuery(0, 10);
    });
    it('Should be defined', () => {
        expect(useCase).toBeDefined();
    });
    it('Should return client details', async () => {
        const result = await useCase.execute(query);
        expect(result).toEqual(dto);
        expect(result.length).toEqual(query.pageSize)
        expect(mockDao.get).toHaveBeenCalledWith(query);
    });
})
