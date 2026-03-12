import { Test, TestingModule } from '@nestjs/testing';
import { EditClientService } from './edit-client.service';

describe('EditClientService', () => {
  let service: EditClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EditClientService],
    }).compile();

    service = module.get<EditClientService>(EditClientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
