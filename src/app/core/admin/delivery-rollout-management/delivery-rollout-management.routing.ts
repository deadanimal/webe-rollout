import { Routes } from '@angular/router';
import { ProjectManagementComponent } from './project-management/project-management.component';
import { PunchlistManagementComponent } from './punchlist-management/punchlist-management.component';
import { BlockingIssuesComponent } from './blocking-issues/blocking-issues.component';
import { TroubleTicketManagementComponent } from './trouble-ticket-management/trouble-ticket-management.component';

export const DeliveryRolloutManagementRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'project-management',
                component: ProjectManagementComponent
            },
            {
                path: 'punchlist-management',
                component: PunchlistManagementComponent
            },
            {
                path: 'blocking-issues',
                component: BlockingIssuesComponent
            },
            {
                path: 'trouble-ticket-management',
                component: TroubleTicketManagementComponent
            }
        ]
    }
]
