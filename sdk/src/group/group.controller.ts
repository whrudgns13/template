import { Controller, Delete, Get, Patch, Post, Put, Req, Res } from '@nestjs/common';
import { GroupService } from './group.service';

@Controller('group')
export class GroupController {
    constructor(private readonly groupService: GroupService) {}
    
    @Get()
    getRoles(){
        return this.groupService.getRoles();
    }

    @Post()
    updateUserRole(@Req() req, @Res() res){
        return this.groupService.updateUserRole(req, res);
    }
    
    @Delete()
    deleteUserRole(@Req() req, @Res() res){
        return this.groupService.deleteUserRole(req, res);
    }
}
