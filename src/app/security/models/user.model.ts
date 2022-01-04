import { PermissionModel } from 'src/app/security/models/permission.model';
import { LabelValueModel } from 'src/app/shared/models/label-value.model';

export interface User {
    name: string;
    email: string;
    permissions: number[];
    permissionsaccount: PermissionModel[];
    lastlogin: Date;
    idprofile: number;
    idaccounts: LabelValueModel[];
    idselectaccount: number;
    access_token: string;
    token_type: string;
    expires_in: number;
}
