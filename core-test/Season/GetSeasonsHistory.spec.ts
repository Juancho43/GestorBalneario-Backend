import {vi} from "vitest";
import {GetSeasonsHistory} from "../../core/Season/Application/UseCase/GetSeasonsHistory";
import {Season} from "../../core/Season/Model/Season";
import {SeasonMother} from "../mothers/SeasonMother";
import {GetSeasonsHistoryQuery} from "../../core/Season/Application/Queries/GetSeasonsHistoryQuery";

describe('GetSeasonsHistory useCase', () => {

    let mockDao;
    let useCase: GetSeasonsHistory;
    let query: GetSeasonsHistoryQuery;
    let dto: Season[] = [];

    beforeEach(() => {
        dto = []
        for(let i =0; i<10; i++){
            dto.push(SeasonMother.create())
        }
        mockDao = {
            get: vi.fn().mockResolvedValue(dto),
        };
        useCase = new GetSeasonsHistory(mockDao);
        query = new GetSeasonsHistoryQuery(0, 10);
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