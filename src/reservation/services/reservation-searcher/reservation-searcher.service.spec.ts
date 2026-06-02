import {Test, TestingModule} from '@nestjs/testing';
import {ReservationSearcherService} from './reservation-searcher.service';

describe('ReservationSearcherService', () => {
  let service: ReservationSearcherService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReservationSearcherService],
    }).compile();

    service = module.get<ReservationSearcherService>(ReservationSearcherService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
