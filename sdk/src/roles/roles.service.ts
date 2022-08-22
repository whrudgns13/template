import { Injectable } from '@nestjs/common';
import { RolesApi } from "../../AuthorizationAPI/roles-api";
@Injectable()
export class RolesService {
    private destination = { destinationName: 'destination-test' };

    async getRoles() {
        const roles = await RolesApi.getRoles().execute(this.destination);
        return roles;
    }
}
