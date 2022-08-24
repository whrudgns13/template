import { Injectable, Req, Res } from '@nestjs/common';
import { RoleCollectionsApi } from "../../AuthorizationAPI/role-collections-api";

@Injectable()
export class RoleCollectionService {
    private destination = { destinationName: 'destination-test' };

    async getRoleCollections(@Req() req, @Res() res) {
        const role = await RoleCollectionsApi.getRoleCollections({ showUsers: true }).execute(this.destination);
        return res.send(role);
    }

    async changeRoleCollectionDescription(@Req() req, @Res() res) {
        const role = await RoleCollectionsApi
            .changeRoleCollectionDescription(req.body.id, req.body.colleaction.description)
            .execute(this.destination);
        return res.send(role);
    }

    async createRoleCollection(@Req() req, @Res() res) {
        const role = await RoleCollectionsApi.createRoleCollection(req.body).execute(this.destination);
        return res.send(role);
    }

    async deleteRoleCollectionByName(@Req() req, @Res() res) {
        const role = await RoleCollectionsApi.deleteRoleCollectionByName(req.body.id).execute(this.destination);
        return res.send(role);
    }

    async addRolesToRoleCollection(@Req() req, @Res() res) {
        let body = req.body;
        const role = await RoleCollectionsApi.addRolesToRoleCollection(body.collectionName, body.roleReference).execute(this.destination);
        return res.send(role);
    }

    async deleteRoleFromRoleCollection(@Req() req, @Res() res) {
        let body = req.body;
        const role = await RoleCollectionsApi
            .deleteRoleFromRoleCollection(body.roleCollectionName, body.roleName, body.roleTemplateAppId, body.roleTemplateName)
            .execute(this.destination);
        return res.send(role);
    }
}
