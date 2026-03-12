import { Test, TestingModule } from '@nestjs/testing';
import { GetCurrentReservationService } from './get-current-reservation.service';

describe('GetCurrentReservationService', () => {
  let service: GetCurrentReservationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetCurrentReservationService],
    }).compile();

    service = module.get<GetCurrentReservationService>(GetCurrentReservationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
