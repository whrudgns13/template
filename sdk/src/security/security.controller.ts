import { Controller, Patch, Req, Res, Get } from '@nestjs/common';
import { SecurityService } from './security.service';

@Controller('security')
export class SecurityController {
    constructor(private readonly securityService: SecurityService) {}
    
    @Get()
    getSecuritySetting(){
        return this.securityService.getSecuritySetting();
    }

    @Patch()
    updateSecuritySetting(@Req() req, @Res() res){
        return this.securityService.updateSecuritySetting(req, res);
    }
}
