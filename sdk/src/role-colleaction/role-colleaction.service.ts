import { Injectable, Req, Res } from '@nestjs/common';
import { RoleCollectionsApi } from "../../AuthorizationAPI/role-collections-api";

@Injectable()
export class RoleColleactionService {
    private destination = { destinationName: 'destination-test' };

    async createRole(@Req() req, @Res() res) {
        const role = await RoleCollectionsApi.createRoleCollection(req.body).execute(this.destination);
        return res.send(role);
    }
}
