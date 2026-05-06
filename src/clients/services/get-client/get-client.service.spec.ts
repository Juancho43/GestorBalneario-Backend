import {Test, TestingModule} from '@nestjs/testing';
import {GetClientService} from './get-client.service';
import {Client} from "../../../../core/Client/Model/Client";
import {CLIENT_TOKEN} from "../../CLIENT_TOKEN";

describe('GetClientService', () => {
  let service: GetClientService;
  let useCaseMock;
  let command;
  beforeEach(async () => {
    useCaseMock = {
      execute : jest.fn().mockResolvedValue({} as Client),
    }
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetClientService,
        {
          provide: CLIENT_TOKEN.USECASE.GET_CLIENT,
          useValue: useCaseMock
        }],
    }).compile();

    service = module.get<GetClientService>(GetClientService);
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
