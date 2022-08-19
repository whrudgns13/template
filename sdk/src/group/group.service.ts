import { Injectable, Req, Res } from '@nestjs/common';
import { SCIMGroupsRoleCollectionsApi } from "../../PlatformAPI/scim-groups-role-collections-api";
@Injectable()
export class GroupService {
    private destination = { destinationName: 'destination-test' };

    async getRoles() {
        const roles = await SCIMGroupsRoleCollectionsApi.getAllGroupsUsingGet().execute(this.destination);
        return roles;
    }

    async updateUserRole(@Req() req, @Res() res) {
        const body = req.body;
        const role = await SCIMGroupsRoleCollectionsApi.updateGroupUsingPost(body.id, body.group)
            .execute(this.destination);
        return res.send(role);
    }

    async deleteUserRole(@Req() req, @Res() res) {
        const body = req.body;
        const role = await SCIMGroupsRoleCollectionsApi.deleteGroupUsingDelete(body.groupId, body.userId)
            .execute(this.destination);
        return res.send(role);
    }

    async createRoles(@Req() req, @Res() res) {
        const role = await SCIMGroupsRoleCollectionsApi.createGroupRoles(req.body).execute(this.destination);
        return res.send(role);
    }
}
