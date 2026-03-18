import { Test, TestingModule } from '@nestjs/testing';
import { GetActiveReservationsController } from './get-active-reservations.controller';

describe('GetActiveReservationsController', () => {
  let controller: GetActiveReservationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetActiveReservationsController],
    }).compile();

    controller = module.get<GetActiveReservationsController>(GetActiveReservationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
