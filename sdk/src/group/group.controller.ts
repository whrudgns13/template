import { Controller, Delete, Get, Patch, Post, Put, Req, Res } from '@nestjs/common';
import { GroupService } from './group.service';

@Controller('group')
export class GroupController {
    constructor(private readonly groupService: GroupService) { }

    @Get()
    getRoles() {
        return this.groupService.getRoles();
    }

    @Post()
    addUserRole(@Req() req, @Res() res) {
        return this.groupService.addUserRole(req, res);
    }

    @Delete()
    deleteUserRole(@Req() req, @Res() res) {
        return this.groupService.deleteUserRole(req, res);
    }

    @Delete("/role")
    deleteRole(@Req() req, @Res() res) {
        return this.groupService.deleteRole(req, res);
    }
}
