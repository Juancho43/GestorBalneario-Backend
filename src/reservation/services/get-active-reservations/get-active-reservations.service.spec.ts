import { Test, TestingModule } from '@nestjs/testing';
import { GetActiveReservationsService } from './get-active-reservations.service';

describe('GetActiveReservationsService', () => {
  let service: GetActiveReservationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetActiveReservationsService],
    }).compile();

    service = module.get<GetActiveReservationsService>(GetActiveReservationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
