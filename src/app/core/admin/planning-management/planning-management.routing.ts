import { Routes } from '@angular/router';
import { MatchingTowerProviderComponent } from './matching-tower-provider/matching-tower-provider.component';
import { SiteSelectionFinalCandidateComponent } from './site-selection-final-candidate/site-selection-final-candidate.component';

export const PlanningManagementRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'matching-tower-provider',
                component: MatchingTowerProviderComponent
            },
            {
                path: 'site-selection-final-candidate',
                component: SiteSelectionFinalCandidateComponent
            }
        ]
    }
]
