import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { AnalysisComponent } from './analysis/analysis.component';
import { ReportComponent } from './report/report.component';

export const MeterRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'register',
                component: RegisterComponent
            },
            {
                path: 'analysis',
                component: AnalysisComponent
            },
            {
                path: 'report',
                component: ReportComponent
            }
        ]
    }
]
