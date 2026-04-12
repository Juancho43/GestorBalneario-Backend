import { Test, TestingModule } from '@nestjs/testing';
import { GetSeasonInvoicesController } from './get-season-invoices.controller';

describe('GetSeasonInvoicesController', () => {
  let controller: GetSeasonInvoicesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetSeasonInvoicesController],
    }).compile();

    controller = module.get<GetSeasonInvoicesController>(
      GetSeasonInvoicesController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
