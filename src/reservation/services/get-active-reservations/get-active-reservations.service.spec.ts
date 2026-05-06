import {Test, TestingModule} from '@nestjs/testing';
import {GetActiveReservationsService} from './get-active-reservations.service';
import {RESERVATION_TOKEN} from "../../RESERVATION_TOKEN";

describe('GetActiveReservationsService', () => {
  let service: GetActiveReservationsService;
  let command;
  let useCaseMock;

  beforeEach(async () => {
    useCaseMock = {
      execute: jest.fn().mockResolvedValue({} as any),
    }
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetActiveReservationsService,
        {
          provide: RESERVATION_TOKEN.USECASE.GET_CURRENT,
          useValue: useCaseMock
        }],
    }).compile();

    service = module.get<GetActiveReservationsService>(
      GetActiveReservationsService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should execute the use case successfully', async () => {
    const result = await service.execute();
    expect(result).toBeDefined();
    expect(useCaseMock.execute).toHaveBeenCalled();
  });

  it('should log an error and re-throw if the use case fails', async () => {
    const errorSimulado = new Error('Database connection failed');
    useCaseMock.execute.mockRejectedValue(errorSimulado);
    await expect(service.execute()).rejects.toThrow(errorSimulado);
  });
});
