import {Test, TestingModule} from '@nestjs/testing';
import {GetInvoiceController} from './get-invoice.controller';
import {InvoiceMother} from "../../../../core-test/mothers/InvoiceMother";
import {GetInvoiceService} from "../../services/get-invoice/get-invoice.service";

describe('GetInvoiceController', () => {
  let controller: GetInvoiceController;
  let serviceMock;
  beforeEach(async () => {
    serviceMock = {
      execute: jest.fn().mockResolvedValue(InvoiceMother.create())
    }
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetInvoiceController],
      providers: [
        {
          provide: GetInvoiceService,
          useValue: serviceMock
        }
      ]
    }).compile();

    controller = module.get<GetInvoiceController>(GetInvoiceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(typeof controller.execute).toBe('function');
  });
  it('Should return a success response', async () => {
    const result = await controller.execute('123');
    expect(serviceMock.execute).toHaveBeenCalled();
    expect(result.statusCode).toBe(200);
    expect(result.message).toContain(' has been ');
  })

});
