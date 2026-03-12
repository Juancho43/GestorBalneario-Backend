import { Test, TestingModule } from '@nestjs/testing';
import { EditReservationService } from './edit-reservation.service';

describe('EditReservationService', () => {
  let service: EditReservationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EditReservationService],
    }).compile();

    service = module.get<EditReservationService>(EditReservationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
