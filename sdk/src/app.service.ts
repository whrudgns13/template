import { Injectable, Req, Res } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): Object {
    return "Hello CY DSteam";
  }
}
