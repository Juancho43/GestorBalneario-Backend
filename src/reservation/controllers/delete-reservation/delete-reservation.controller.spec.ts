import { Test, TestingModule } from '@nestjs/testing';
import { DeleteReservationController } from './delete-reservation.controller';

describe('DeleteReservationController', () => {
  let controller: DeleteReservationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeleteReservationController],
    }).compile();

    controller = module.get<DeleteReservationController>(DeleteReservationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
