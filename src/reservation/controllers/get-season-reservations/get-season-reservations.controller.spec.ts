import {Test, TestingModule} from '@nestjs/testing';
import {GetSeasonReservationsController} from './get-season-reservations.controller';

describe('GetSeasonReservationsController', () => {
  let controller: GetSeasonReservationsController;
  let serviceMock;
  beforeEach(async () => {
    serviceMock = {
      execute: jest.fn().mockResolvedValue(undefined)
    }
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetSeasonReservationsController],
    }).compile();

    controller = module.get<GetSeasonReservationsController>(
      GetSeasonReservationsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('Should return a success response', async () => {
    const result = await controller.execute('id',0,10)
    expect(result.statusCode).toBe(200);
    expect(result.message).toContain(' has been ');
  })

});
