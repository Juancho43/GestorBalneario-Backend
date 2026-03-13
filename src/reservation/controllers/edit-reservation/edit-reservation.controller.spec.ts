import { Test, TestingModule } from '@nestjs/testing';
import { EditReservationController } from './edit-reservation.controller';

describe('EditReservationController', () => {
  let controller: EditReservationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EditReservationController],
    }).compile();

    controller = module.get<EditReservationController>(EditReservationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
