import { Test, TestingModule } from '@nestjs/testing';
import { RoleColleactionService } from './role-colleaction.service';

describe('RoleColleactionService', () => {
  let service: RoleColleactionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoleColleactionService],
    }).compile();

    service = module.get<RoleColleactionService>(RoleColleactionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
