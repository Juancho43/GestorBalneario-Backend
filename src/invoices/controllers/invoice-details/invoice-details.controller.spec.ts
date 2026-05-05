import {Test, TestingModule} from '@nestjs/testing';
import {InvoiceDetailsController} from './invoice-details.controller';
import {InvoiceDetailsDTO} from "../../../../core/Invoice/Application/DTO/InvoiceDetailsDTO";
import {InvoiceDetailsService} from "../../services/invoice-details/invoice-details.service";

describe('InvoiceDetailsController', () => {
  let controller: InvoiceDetailsController;
let serviceMock;
let id = '12';
  beforeEach(async () => {
    serviceMock = {
      execute: jest.fn().mockResolvedValue({} as InvoiceDetailsDTO)
    }
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InvoiceDetailsController],
      providers:[
        {
          provide: InvoiceDetailsService,
          useValue: serviceMock
        }

      ]
    }).compile();

    controller = module.get<InvoiceDetailsController>(InvoiceDetailsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should excute', async () => {
    const result = await controller.execute(id);

    expect(result.statusCode).toBe(200);
    expect(result.message).toContain('retrieved ');
  });
});
