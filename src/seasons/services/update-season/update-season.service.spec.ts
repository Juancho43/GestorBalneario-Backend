import {Test, TestingModule} from '@nestjs/testing';
import {UpdateSeasonService} from './update-season.service';
import {SEASON_TOKEN} from '../../SEASON_TOKEN';
import {Season} from '../../../../core/Season/Model/Season';

describe('UpdateSeasonService', () => {
  let service: UpdateSeasonService;
  let useCaseMock;
  let command;
  beforeEach(async () => {
    useCaseMock = {
      execute: jest.fn().mockResolvedValue({} as Season),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateSeasonService,
        {
          provide: SEASON_TOKEN.USECASE.UPDATE_SEASON,
          useValue: useCaseMock,
        },
      ],
    }).compile();

    service = module.get<UpdateSeasonService>(UpdateSeasonService);
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
