import { Controller, Delete, Get, Patch, Post, Put, Req, Res } from '@nestjs/common';
import e from 'express';
import { UserService } from './user.service';


@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}
    @Get()
    getUsers(@Req() req, @Res() res){
        if(req.authInfo.checkScope("$XSAPPNAME.User")){
            return this.userService.getUsers(req, res);
        }else{
            res.status(403).send("Forbidden");
        }
    }

    @Get('/currentUser')
    getCurrentUser(@Req() req, @Res() res){
        return this.userService.getCurrentUser(req, res);
    }

    @Post()
    createUser(@Req() req, @Res() res){
        return this.userService.createUser(req, res);
    }

    @Delete()
    deleteUser(@Req() req, @Res() res){
        return this.userService.deleteUser(req, res);;
    }
    
    @Put()
    updateUser(@Req() req, @Res() res){
        return this.userService.updateUser(req,res);
    }
}
