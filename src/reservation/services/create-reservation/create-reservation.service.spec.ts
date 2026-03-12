import { Test, TestingModule } from '@nestjs/testing';
import { CreateReservationService } from './create-reservation.service';

describe('CreateReservationService', () => {
  let service: CreateReservationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateReservationService],
    }).compile();

    service = module.get<CreateReservationService>(CreateReservationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
