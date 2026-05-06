import {Test, TestingModule} from '@nestjs/testing';
import {GetSeasonInvoicesController} from './get-season-invoices.controller';

describe('GetSeasonInvoicesController', () => {
  let controller: GetSeasonInvoicesController;
  let serviceMock;
  beforeEach(async () => {
    serviceMock = {
      execute: jest.fn().mockResolvedValue(undefined)
    }
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetSeasonInvoicesController],
      providers: [
      ]
    }).compile();

    controller = module.get<GetSeasonInvoicesController>(
      GetSeasonInvoicesController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
