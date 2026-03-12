import { Test, TestingModule } from '@nestjs/testing';
import { DeleteClientService } from './delete-client.service';

describe('DeleteClientService', () => {
  let service: DeleteClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeleteClientService],
    }).compile();

    service = module.get<DeleteClientService>(DeleteClientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
