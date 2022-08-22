import { Controller, Get, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getRolePermission(@Req() req, @Res() res) {
    if (req.authInfo.checkScope("$XSAPPNAME.Admin")) res.send({ permission: true });

    res.send({ permission: false });
  }
}
