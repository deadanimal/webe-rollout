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

import { UserAccessManagementRoutes } from './user-access-management.routing';
import { UserSetupAccessRightsComponent } from './user-setup-access-rights/user-setup-access-rights.component';
import { UserMatrixComponent } from './user-matrix/user-matrix.component';
import { PasswordComponent } from './password/password.component';
import { UserActivityLogReportsComponent } from './user-activity-log-reports/user-activity-log-reports.component';
import { NetworkGeographyComponent } from './network-geography/network-geography.component';

@NgModule({
  declarations: [
    UserSetupAccessRightsComponent,
    UserMatrixComponent,
    PasswordComponent,
    UserActivityLogReportsComponent,
    NetworkGeographyComponent
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
    RouterModule.forChild(UserAccessManagementRoutes)
  ]
})
export class UserAccessManagementModule { }
