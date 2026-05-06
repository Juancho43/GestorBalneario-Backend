import {Test, TestingModule} from '@nestjs/testing';
import {SetActiveSeasonService} from './set-active-season.service';
import {SEASON_TOKEN} from "../../SEASON_TOKEN";
import {GetActiveSeasonService} from "../get-active-season/get-active-season.service";

describe('SetActiveSeasonService', () => {
  let service: SetActiveSeasonService;
  let command;
  let useCaseMock;
  beforeEach(async () => {
    useCaseMock = {
      execute: jest.fn().mockResolvedValue({}as any),
    }
    const module: TestingModule = await Test.createTestingModule({
      providers: [SetActiveSeasonService,{
        provide: SEASON_TOKEN.USECASE.SET_ACTIVE,
        useValue: useCaseMock,
      },
        {
          provide:GetActiveSeasonService,
          useValue: { execute: jest.fn()}
        }],
    }).compile();

    service = module.get<SetActiveSeasonService>(SetActiveSeasonService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should execute the use case successfully', async () => {
    const result = await service.execute(command);

    expect(useCaseMock.execute).toHaveBeenCalled();
  });

  it('should log an error and re-throw if the use case fails', async () => {
    const errorSimulado = new Error('Database connection failed');
    useCaseMock.execute.mockRejectedValue(errorSimulado);
    await expect(service.execute(command)).rejects.toThrow(errorSimulado);
  });
});
