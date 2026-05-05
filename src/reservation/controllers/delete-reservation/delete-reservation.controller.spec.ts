import {Test, TestingModule} from '@nestjs/testing';
import {DeleteReservationController} from './delete-reservation.controller';
import {DeleteReservationService} from "../../services/delete-reservation/delete-reservation.service";

describe('DeleteReservationController', () => {
  let controller: DeleteReservationController;
  let command;
  let serviceMock;
  beforeEach(async () => {
    serviceMock={
      execute: jest.fn().mockResolvedValue(undefined)
    }
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeleteReservationController],
      providers: [
        {
          provide: DeleteReservationService,
          useValue: serviceMock
        }
      ]
    }).compile();

    controller = module.get<DeleteReservationController>(
      DeleteReservationController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should excute', async () => {
    const result = await controller.execute(command);

    expect(result.statusCode).toBe(204);
    expect(result.message).toContain('been ');
  });
});
