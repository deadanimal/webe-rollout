import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HelpdeskComponent } from './helpdesk/helpdesk.component';
import { AssetManagementComponent } from './asset-management/asset-management.component';
import { AcceptanceApprovalManagementComponent } from './acceptance-approval-management/acceptance-approval-management.component';

export const AdminRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'dashboard',
                component: DashboardComponent
            },
            {
                path: 'user-access-management',
                loadChildren: './user-access-management/user-access-management.module#UserAccessManagementModule'
            },
            {
                path: 'acceptance-approval-management',
                component: AcceptanceApprovalManagementComponent
            },
            {
                path: 'planning-management',
                loadChildren: './planning-management/planning-management.module#PlanningManagementModule'
            },
            {
                path: 'delivery-rollout-management',
                loadChildren: './delivery-rollout-management/delivery-rollout-management.module#DeliveryRolloutManagementModule'
            },
            {
                path: 'asset-management',
                component: AssetManagementComponent
            },
            {
                path: 'administration',
                loadChildren: './administration/administration.module#AdministrationModule'
            },
            {
                path: 'helpdesk',
                component: HelpdeskComponent
            },
            {
                path: 'meter',
                loadChildren: './meter/meter.module#MeterModule'
            }
        ]
    }
]
