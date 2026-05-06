import {Test, TestingModule} from '@nestjs/testing';
import {GetShadowHistoryService} from './get-shadow-history.service';
import {SHADOW_TOKEN} from "../../SHADOW_TOKEN";

describe('GetShadowHistoryService', () => {
  let service: GetShadowHistoryService;
  let useCaseMock;
  let command;

  beforeEach(async () => {
    useCaseMock = {
      execute: jest.fn().mockResolvedValue({} as any)
    }
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetShadowHistoryService,
        {
          provide:SHADOW_TOKEN.USECASE.GET_SHADOW_DETAILS,
          useValue: useCaseMock,
        }],
    }).compile();

    service = module.get<GetShadowHistoryService>(GetShadowHistoryService);
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
