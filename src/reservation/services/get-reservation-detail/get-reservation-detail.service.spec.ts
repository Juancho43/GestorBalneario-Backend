import { Test, TestingModule } from '@nestjs/testing';
import { GetReservationDetailService } from './get-reservation-detail.service';

describe('GetReservationDetailService', () => {
  let service: GetReservationDetailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetReservationDetailService],
    }).compile();

    service = module.get<GetReservationDetailService>(GetReservationDetailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
