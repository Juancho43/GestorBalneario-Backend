import {Test, TestingModule} from '@nestjs/testing';
import {ClientDetailsService} from './client-details.service';
import {CLIENT_TOKEN} from "../../CLIENT_TOKEN";

describe('ClientDetailsService', () => {
  let service: ClientDetailsService;
  let command;
  let useCaseMock;
  beforeEach(async () => {
    useCaseMock = {
      execute: jest.fn().mockResolvedValue({} as any),
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [ClientDetailsService,{
        provide: CLIENT_TOKEN.USECASE.CLIENT_DETAILS,
        useValue: useCaseMock,
      }],
    }).compile();

    service = module.get<ClientDetailsService>(ClientDetailsService);
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
