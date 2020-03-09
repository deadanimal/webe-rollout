import { Routes } from '@angular/router';
import { UserSetupAccessRightsComponent } from './user-setup-access-rights/user-setup-access-rights.component';
import { UserMatrixComponent } from './user-matrix/user-matrix.component';
import { PasswordComponent } from './password/password.component';
import { UserActivityLogReportsComponent } from './user-activity-log-reports/user-activity-log-reports.component';
import { NetworkGeographyComponent } from './network-geography/network-geography.component';

export const UserAccessManagementRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'user-setup-access-rights',
                component: UserSetupAccessRightsComponent
            },
            {
                path: 'user-matrix',
                component: UserMatrixComponent
            },
            {
                path: 'password',
                component: PasswordComponent
            },
            {
                path: 'user-activity-log-reports',
                component: UserActivityLogReportsComponent
            },
            {
                path: 'network-geography',
                component: NetworkGeographyComponent
            }
        ]
    }
]
