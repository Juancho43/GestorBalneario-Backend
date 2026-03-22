import { Test, TestingModule } from '@nestjs/testing';
import { GetReservationsWithClientsController } from './get-reservations-with-clients.controller';

describe('GetReservationsWithClientsController', () => {
  let controller: GetReservationsWithClientsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetReservationsWithClientsController],
    }).compile();

    controller = module.get<GetReservationsWithClientsController>(GetReservationsWithClientsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
