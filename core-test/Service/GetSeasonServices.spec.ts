import {GetSeasonServices} from '../../core/Service/Application/UseCase/GetSeasonServices';
import {vi} from 'vitest';
import {SeasonServiceDTO} from '../../core/Service/Application/DTO/SeasonServiceDTO';
import {ServiceResponse} from '../../core/Service/Application/DTO/ServiceResponse';
import {ServiceMother} from '../mothers/ServiceMother';
import {GetSeasonEntityQuery} from '../../core/Service/Application/Queries/GetSeasonEntityQuery';

describe('GetSeasonServices UseCase', () => {
  let useCase: GetSeasonServices;
  let mockDao;
  let dto: SeasonServiceDTO;

  beforeEach(() => {
    const services: ServiceResponse[] = [];
    for (let i = 0; i < 3; i++) {
      services.push(ServiceResponse.create(ServiceMother.create()));
    }
    dto = new SeasonServiceDTO(services);
    mockDao = {
      get: vi.fn().mockResolvedValue(services),
    };
    useCase = new GetSeasonServices(mockDao);
  });

  it('Should be defined', () => {
    expect(useCase).toBeDefined();
  });
  it('Should return a list of services for the active season', async () => {
    const result = await useCase.execute(
      new GetSeasonEntityQuery(0, 10, '123'),
    );
    expect(result).toEqual(dto.services);
  });
});
