import {ClientSearch} from '../../core/Client/Application/UseCase/ClientSearch';
import {ClientResponse} from '../../core/Client/Application/DTO/ClientResponse';
import {ClientSearchQuery} from '../../core/Client/Application/Queries/ClientSearchQuery';
import {ClientMother} from '../mothers/ClientMother';
import {vi} from 'vitest';

describe('Client Search UseCase', () => {
  let mockDao;
  let useCase: ClientSearch;
  let dto: ClientResponse[] = [];
  let query: ClientSearchQuery;
  beforeEach(() => {
    for (let i = 0; i < 10; i++) {
      dto.push(ClientResponse.create(ClientMother.create()));
      mockDao = {
        search: vi.fn().mockResolvedValue(dto),
      };
      useCase = new ClientSearch(mockDao);
      query = new ClientSearchQuery(0, 10, 'prueba');
    }
  });
  it('Should be created', () => {
    expect(useCase).toBeDefined();
  });
  it('Should return a list of clients', async () => {
    const results = await useCase.execute(query);
    expect(results).toEqual(dto);
    expect(mockDao.search).toHaveBeenCalledWith(query);
  });
});
