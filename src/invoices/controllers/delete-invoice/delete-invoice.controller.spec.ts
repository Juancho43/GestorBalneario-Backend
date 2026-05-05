import {Test, TestingModule} from '@nestjs/testing';
import {DeleteInvoiceController} from './delete-invoice.controller';
import {DeleteInvoiceService} from "../../services/delete-service/delete-invoice.service";

describe('DeleteInvoiceController', () => {
  let controller: DeleteInvoiceController;
  let serviceMock;
  let command;
  beforeEach(async () => {
    serviceMock = {
      execute: jest.fn().mockResolvedValue(undefined)
    }
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeleteInvoiceController],
      providers: [
        {
          provide: DeleteInvoiceService,
          useValue: serviceMock
        }
      ]
    }).compile();

    controller = module.get<DeleteInvoiceController>(DeleteInvoiceController);
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
