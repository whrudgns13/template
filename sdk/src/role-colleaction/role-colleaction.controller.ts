import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { RoleColleactionService } from './role-colleaction.service';

@Controller('role-colleaction')
export class RoleColleactionController {
    constructor(private readonly roleColleactionService: RoleColleactionService) { }

    @Post()
    createRole(@Req() req, @Res() res) {
        return this.roleColleactionService.createRole(req, res);
    }
}
