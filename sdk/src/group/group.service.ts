import { Injectable } from '@nestjs/common';
import {SCIMGroupsRoleCollectionsApi} from "../../PlatformAPI/scim-groups-role-collections-api";
@Injectable()
export class GroupService {
    private destination = { destinationName: 'destination-test' };
    async getRoles() {
        const roles = await SCIMGroupsRoleCollectionsApi.getAllGroupsUsingGet().execute(this.destination);
        return roles;
    }
}
