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

import { MeterRoutes } from './meter.routing';
import { RegisterComponent } from './register/register.component';
import { AnalysisComponent } from './analysis/analysis.component';
import { ReportComponent } from './report/report.component';

@NgModule({
  declarations: [
    RegisterComponent,
    AnalysisComponent,
    ReportComponent
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
    RouterModule.forChild(MeterRoutes)
  ]
})
export class MeterModule { }
