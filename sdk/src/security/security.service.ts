import { Injectable, Req, Res } from '@nestjs/common';
import {SecuritySettingsApi} from "../../SecuritySettingsAPI/security-settings-api";
@Injectable()
export class SecurityService {
    private destination = { destinationName: 'destination-test' };

    async updateToken(@Req() req, @Res() res){
        const setting = await SecuritySettingsApi.updateSettings(req.body).execute(this.destination);
        return res.send(setting);
    }
}
