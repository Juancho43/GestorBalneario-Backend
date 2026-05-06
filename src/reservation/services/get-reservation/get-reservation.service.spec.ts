import {Test, TestingModule} from '@nestjs/testing';
import {GetReservationService} from './get-reservation.service';
import {Reservation} from '../../../../core/Reservation/Model/Reservation';
import {RESERVATION_TOKEN} from '../../RESERVATION_TOKEN';

describe('GetReservationService', () => {
  let service: GetReservationService;
  let useCaseMock;
  let command;
  beforeEach(async () => {
    useCaseMock = {
      execute: jest.fn().mockResolvedValue({} as Reservation),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetReservationService,
        {
          provide: RESERVATION_TOKEN.USECASE.GET_RESERVATION,
          useValue: useCaseMock,
        },
      ],
    }).compile();

    service = module.get<GetReservationService>(GetReservationService);
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
