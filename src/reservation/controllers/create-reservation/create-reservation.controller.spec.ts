import { Test, TestingModule } from '@nestjs/testing';
import { CreateReservationController } from './create-reservation.controller';

describe('CreateReservationController', () => {
  let controller: CreateReservationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreateReservationController],
    }).compile();

    controller = module.get<CreateReservationController>(CreateReservationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
