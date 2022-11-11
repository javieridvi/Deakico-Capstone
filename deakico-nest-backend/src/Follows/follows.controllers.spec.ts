import { Test, TestingModule } from '@nestjs/testing';
import { FollowsController } from './follows.controllers';
import { FollowEntity } from './follows.entity';
import { FollowsService } from './follows.service';

describe('FollowsController', () => {
  let followsController: FollowsController;
  let followsService: FollowsService;

  const mockFollowsService = {
    insertFollow: jest.fn((user, dto) => {
      const u_id = user.u_id;
      return {
        ...dto,
        u_id,
      };
    }),
  };

  const mockUserService = {};

  const mockUser1 = {
    u_id: 99,
    u_firstname: 'Mock',
    u_lastname: 'Mockenzy',
    email: 'mock.test@gmail.com',
    username: 'mockity123',
    password: 'mockers321',
    pa_id: 100,
  };

  const req = { user: mockUser1 };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FollowsController],
      providers: [FollowsService, FollowEntity],
    })
      .overrideProvider(FollowsService)
      .useValue(mockFollowsService)
      .compile();

    followsController = module.get<FollowsController>(FollowsController);
  });

  it('should be defined', () => {
    expect(followsController).toBeDefined();
  });

  it('should return new Follows object.', () => {
    const dto = { pa_id: 99 };
    expect(followsController.insertFollow(dto, req)).toEqual({
      ...dto,
      u_id: mockUser1.u_id,
    });
  });
});
