import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressbarModule } from "ngx-bootstrap/progressbar";
import { BsDropdownModule } from "ngx-bootstrap";
import { PaginationModule } from "ngx-bootstrap/pagination";
import { TooltipModule } from "ngx-bootstrap/tooltip";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { NgxPrintModule } from "ngx-print";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule } from '@angular/forms';
import { ModalModule } from "ngx-bootstrap/modal";

import { RouterModule } from '@angular/router';

import { DeliveryRolloutManagementRoutes } from './delivery-rollout-management.routing';
import { ProjectManagementComponent } from './project-management/project-management.component';
import { PunchlistManagementComponent } from './punchlist-management/punchlist-management.component';
import { BlockingIssuesComponent } from './blocking-issues/blocking-issues.component';
import { TroubleTicketManagementComponent } from './trouble-ticket-management/trouble-ticket-management.component';

@NgModule({
  declarations: [ProjectManagementComponent, PunchlistManagementComponent, BlockingIssuesComponent, TroubleTicketManagementComponent],
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
    RouterModule.forChild(DeliveryRolloutManagementRoutes)
  ]
})
export class DeliveryRolloutManagementModule { }
