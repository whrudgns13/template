import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { SecurityService } from './security/security.service';
import { SecurityController } from './security/security.controller';

@Module({
  imports: [],
  controllers: [AppController, UserController, SecurityController],
  providers: [AppService, UserService, SecurityService],
})
export class AppModule {}
