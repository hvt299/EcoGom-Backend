import { Test, TestingModule } from '@nestjs/testing';
import { WastesController } from './wastes.controller';
import { WastesService } from './wastes.service';

describe('WastesController', () => {
  let controller: WastesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WastesController],
      providers: [WastesService],
    }).compile();

    controller = module.get<WastesController>(WastesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
