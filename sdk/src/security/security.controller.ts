import { Controller, Patch, Req, Res } from '@nestjs/common';
import { SecurityService } from './security.service';

@Controller('security')
export class SecurityController {
    constructor(private readonly securityService: SecurityService) {}
    
    @Patch()
    updateToken(@Req() req, @Res() res){
        return this.securityService.updateToken(req, res);
    }
}
