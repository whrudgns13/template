import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { SecurityService } from './security/security.service';
import { SecurityController } from './security/security.controller';
import { EventsController } from './events/events.controller';
import { EventsService } from './events/events.service';
import { GroupService } from './group/group.service';
import { GroupController } from './group/group.controller';

@Module({
  imports: [],
  controllers: [AppController, UserController, SecurityController, EventsController, GroupController],
  providers: [AppService, UserService, SecurityService, EventsService, GroupService],
})
export class AppModule {}