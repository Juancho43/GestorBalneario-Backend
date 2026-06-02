import {Test, TestingModule} from '@nestjs/testing';
import {GetPaymentTypesService} from './get-payment-types.service';

describe('GetPaymentTypesService', () => {
  let service: GetPaymentTypesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetPaymentTypesService],
    }).compile();

    service = module.get<GetPaymentTypesService>(GetPaymentTypesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
