import {Test, TestingModule} from '@nestjs/testing';
import {InvoiceSearcherController} from './invoice-searcher.controller';

describe('InvoiceSearcherController', () => {
  let controller: InvoiceSearcherController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InvoiceSearcherController],
    }).compile();

    controller = module.get<InvoiceSearcherController>(InvoiceSearcherController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
