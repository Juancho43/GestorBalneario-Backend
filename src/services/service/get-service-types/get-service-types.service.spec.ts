import { Test, TestingModule } from '@nestjs/testing';
import { GetServiceTypesService } from './get-service-types.service';

describe('GetServiceTypesService', () => {
  let service: GetServiceTypesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetServiceTypesService],
    }).compile();

    service = module.get<GetServiceTypesService>(GetServiceTypesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
