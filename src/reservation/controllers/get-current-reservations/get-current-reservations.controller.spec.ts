import { Test, TestingModule } from '@nestjs/testing';
import { GetCurrentReservationsController } from './get-current-reservations.controller';

describe('GetCurrentReservationsController', () => {
  let controller: GetCurrentReservationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetCurrentReservationsController],
    }).compile();

    controller = module.get<GetCurrentReservationsController>(GetCurrentReservationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
