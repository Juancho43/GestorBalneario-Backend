import {Test, TestingModule} from '@nestjs/testing';
import {CreateSeasonService} from './create-season.service';
import {CreateSeasonCommand} from '../../../../core/Season/Application/Commads/CreateSeasonCommand';
import {SEASON_TOKEN} from '../../SEASON_TOKEN';
import {SeasonResponse} from '../../../../core/Season/Application/DTO/SeasonResponse';

describe('CreateSeasonService', () => {
  let service: CreateSeasonService;
  let useCaseMock;
  let command: CreateSeasonCommand;
  beforeEach(async () => {
    useCaseMock = {
      execute: jest.fn().mockResolvedValue({} as SeasonResponse),
    };
    command = {
      endDate: '2021-01-20',
      isActive: false,
      name: '2020-21',
      startDate: '2020-01-20',
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateSeasonService,
        {
          provide: SEASON_TOKEN.USECASE.CREATE_SEASON,
          useValue: useCaseMock,
        },
      ],
    }).compile();

    service = module.get<CreateSeasonService>(CreateSeasonService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should execute the use case successfully', async () => {
    const result = await service.execute(command);

    expect(result).toBeDefined();
    expect(useCaseMock.execute).toHaveBeenCalled();
  });

  it('should log an error and re-throw if the use case fails', async () => {
    const errorSimulado = new Error('Database connection failed');
    useCaseMock.execute.mockRejectedValue(errorSimulado);
    await expect(service.execute(command)).rejects.toThrow(errorSimulado);
  });
});
