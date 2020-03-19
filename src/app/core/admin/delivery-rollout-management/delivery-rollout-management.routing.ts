import { Routes } from '@angular/router';
import { ProjectManagementComponent } from './project-management/project-management.component';

export const DeliveryRolloutManagementRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'project-management',
                component: ProjectManagementComponent
            }
        ]
    }
]
