import { Test, TestingModule } from '@nestjs/testing';
import { GetReservationService } from './get-reservation.service';

describe('GetReservationService', () => {
  let service: GetReservationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetReservationService],
    }).compile();

    service = module.get<GetReservationService>(GetReservationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
