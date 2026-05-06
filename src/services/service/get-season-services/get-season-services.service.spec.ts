import {Test, TestingModule} from '@nestjs/testing';
import {GetSeasonServicesService} from './get-season-services.service';
import {SERVICE_TOKEN} from "../../SERVICE_TOKEN";

describe('GetSeasonServicesService', () => {
  let service: GetSeasonServicesService;
  let command;
  let useCaseMock;
  beforeEach(async () => {
    useCaseMock = {
      execute: jest.fn().mockResolvedValue({} as any),
    }
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetSeasonServicesService,{
        provide:SERVICE_TOKEN.USECASE.GET_SEASON_SERVICE,
        useValue: useCaseMock,
      }],
    }).compile();

    service = module.get<GetSeasonServicesService>(GetSeasonServicesService);
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
