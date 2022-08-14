import { Injectable, Req, Res } from '@nestjs/common';
import {SecuritySettingsApi} from "../../SecuritySettingsAPI/security-settings-api";
@Injectable()
export class SecurityService {
    private destination = { destinationName: 'destination-test' };

    async getSecuritySetting(){
        const setting = await SecuritySettingsApi.readSettings().execute(this.destination);
        return setting;
    }

    async updateSecuritySetting(@Req() req, @Res() res){
        const setting = await SecuritySettingsApi.updateSettings(req.body).execute(this.destination);
        return res.send(setting);
    }
}
