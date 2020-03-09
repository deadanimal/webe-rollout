import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProgressbarModule } from "ngx-bootstrap/progressbar";
import { BsDropdownModule } from "ngx-bootstrap";
import { PaginationModule } from "ngx-bootstrap/pagination";
import { TooltipModule } from "ngx-bootstrap/tooltip";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { NgxPrintModule } from "ngx-print";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule } from "@angular/forms";
import { ModalModule } from "ngx-bootstrap/modal";
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

import { RouterModule } from "@angular/router";

import { PlanningManagementRoutes } from "./planning-management.routing";
import { MatchingTowerProviderComponent } from "./matching-tower-provider/matching-tower-provider.component";
import { SiteSelectionFinalCandidateComponent } from './site-selection-final-candidate/site-selection-final-candidate.component';

@NgModule({
  declarations: [MatchingTowerProviderComponent, SiteSelectionFinalCandidateComponent],
  imports: [
    CommonModule,
    NgxDatatableModule,
    NgxPrintModule,
    PaginationModule.forRoot(),
    NgbModule,
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    ProgressbarModule.forRoot(),
    TooltipModule.forRoot(),
    FormsModule,
    BsDatepickerModule.forRoot(),
    LeafletModule.forRoot(),
    RouterModule.forChild(PlanningManagementRoutes)
  ]
})
export class PlanningManagementModule {}
