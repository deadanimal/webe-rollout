import { Routes } from '@angular/router';
import { MatchingTowerProviderComponent } from './matching-tower-provider/matching-tower-provider.component';
import { SiteSelectionFinalCandidateComponent } from './site-selection-final-candidate/site-selection-final-candidate.component';
import { PurchaseRequestComponent } from './purchase-request/purchase-request.component';
import { ChangeRequestComponent } from './change-request/change-request.component';
import { BoqBomComponent } from './boq-bom/boq-bom.component';

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
            },
            {
                path: 'purchase-request',
                component: PurchaseRequestComponent
            },
            {
                path: 'change-request',
                component: ChangeRequestComponent
            },
            {
                path: 'boq-bom',
                component: BoqBomComponent
            }
        ]
    }
]
