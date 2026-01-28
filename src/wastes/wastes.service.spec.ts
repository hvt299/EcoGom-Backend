import { Test, TestingModule } from '@nestjs/testing';
import { WastesService } from './wastes.service';

describe('WastesService', () => {
  let service: WastesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WastesService],
    }).compile();

    service = module.get<WastesService>(WastesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
