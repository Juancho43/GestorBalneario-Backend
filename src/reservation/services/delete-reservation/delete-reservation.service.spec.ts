import {Test, TestingModule} from '@nestjs/testing';
import {DeleteReservationService} from './delete-reservation.service';
import {RESERVATION_TOKEN} from '../../RESERVATION_TOKEN';

describe('DeleteReservationService', () => {
  let service: DeleteReservationService;
  let useCaseMock;
  let command;
  beforeEach(async () => {
    useCaseMock = {
      execute: jest.fn().mockResolvedValue(undefined),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteReservationService,
        {
          provide: RESERVATION_TOKEN.USECASE.DELETE_RESERVATION,
          useValue: useCaseMock,
        },
      ],
    }).compile();

    service = module.get<DeleteReservationService>(DeleteReservationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should execute the use case successfully', async () => {
    const result = await service.execute(command);

    expect(useCaseMock.execute).toHaveBeenCalled();
  });

  it('should throw error if use case throws', async () => {
    const errorSimulado = new Error('Database connection failed');
    useCaseMock.execute.mockRejectedValue(errorSimulado);
    await expect(service.execute(command)).rejects.toThrow(errorSimulado);
  });
});
