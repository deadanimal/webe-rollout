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

import { AdminRoutes } from './admin.routing';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HelpdeskComponent } from './helpdesk/helpdesk.component';
import { DeliveryRolloutManagementComponent } from './delivery-rollout-management/delivery-rollout-management.component';
import { AssetManagementComponent } from './asset-management/asset-management.component';
import { AcceptanceApprovalManagementComponent } from './acceptance-approval-management/acceptance-approval-management.component';

@NgModule({
  declarations: [
    DashboardComponent,
    HelpdeskComponent,
    DeliveryRolloutManagementComponent,
    AssetManagementComponent,
    AcceptanceApprovalManagementComponent
  ],
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
    RouterModule.forChild(AdminRoutes)
  ]
})
export class AdminModule { }
