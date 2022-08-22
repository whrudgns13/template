import { Test, TestingModule } from '@nestjs/testing';
import { RoleColleactionController } from './role-colleaction.controller';

describe('RoleColleactionController', () => {
  let controller: RoleColleactionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoleColleactionController],
    }).compile();

    controller = module.get<RoleColleactionController>(RoleColleactionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
