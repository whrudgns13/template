import { Injectable, Req, Res } from '@nestjs/common';
import { SCIMGroupsRoleCollectionsApi } from "../../PlatformAPI/scim-groups-role-collections-api";
@Injectable()
export class GroupService {
    private destination = { destinationName: 'destination-test' };

    async getRoleColleactions() {
        const roles = await SCIMGroupsRoleCollectionsApi.getAllGroupsUsingGet().execute(this.destination);
        return roles;
    }

    async addUserRoleColleaction(@Req() req, @Res() res) {
        const body = req.body;
        const role = await SCIMGroupsRoleCollectionsApi.addUserRoleUsingPost(body.id, body.group)
            .execute(this.destination);
        return res.send(role);
    }

    async deleteUserRoleColleaction(@Req() req, @Res() res) {
        const body = req.body;
        const role = await SCIMGroupsRoleCollectionsApi.deleteUserRoleUsingDelete(body.groupId, body.userId)
            .execute(this.destination);
        return res.send(role);
    }

    // async deleteRoleColleaction(@Req() req, @Res() res) {
    //     const role = await SCIMGroupsRoleCollectionsApi.deleteGroupRole(req.body.id).execute(this.destination);
    //     return res.send(role);
    // }

    // async updateRoleColleaction(@Req() req, @Res() res) {
    //     const body = req.body;
    //     const role = await SCIMGroupsRoleCollectionsApi.patchGroupUsingPatch(body.id, body)
    //         .addCustomHeaders({ 'If-Match': '*' }).execute(this.destination);
    //     return res.send(role);
    // }
}
