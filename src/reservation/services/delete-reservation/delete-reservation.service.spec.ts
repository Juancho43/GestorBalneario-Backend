import { Test, TestingModule } from '@nestjs/testing';
import { DeleteReservationService } from './delete-reservation.service';

describe('DeleteReservationService', () => {
  let service: DeleteReservationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeleteReservationService],
    }).compile();

    service = module.get<DeleteReservationService>(DeleteReservationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
