import { Test, TestingModule } from '@nestjs/testing';
import { GetReservationController } from './get-reservation.controller';

describe('GetReservationController', () => {
  let controller: GetReservationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetReservationController],
    }).compile();

    controller = module.get<GetReservationController>(GetReservationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
