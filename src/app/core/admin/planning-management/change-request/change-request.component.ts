import { Component, OnInit, NgZone } from "@angular/core";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import * as PurchaseChanges from "src/app/variables/purchasechanges";
import swal from "sweetalert2";

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
am4core.useTheme(am4themes_animated);

export enum SelectionType {
  single = "single",
  multi = "multi",
  multiClick = "multiClick",
  cell = "cell",
  checkbox = "checkbox"
}

@Component({
  selector: "app-change-request",
  templateUrl: "./change-request.component.html",
  styleUrls: ["./change-request.component.scss"]
})
export class ChangeRequestComponent implements OnInit {
  entries: number = 5;
  selected: any[] = [];
  temp = [];
  activeRow: any;
  rows = PurchaseChanges.PuchaseChanges;
  SelectionType = SelectionType;

  addmaterials = [0];

  // dropdowns
  progresss = ["not started", "pending", "complete"];

  // searchInput
  searchInput = {
    changerequestid: "",
    changeorder: ""
  };

  // formInput
  formInput = {
    changerequestid: "",
    changeorder: "",
    date: "",
    progress: ""
  };

  // Modal
  closeResult: string;
  processTitle: string;

  constructor(public zone: NgZone, private modalService: NgbModal) {
    this.temp = this.rows.map((prop, key) => {
      return {
        ...prop,
        id: key
      };
    });
  }

  addMaterial(index) {
    let value = index + 1;
    this.addmaterials.push(value);
    console.log(this.addmaterials);
  }

  removeMaterial(index) {
    if (index != 0) {
      this.addmaterials.splice(index, 1);
    }
    console.log(this.addmaterials);
  }

  entriesChange($event) {
    this.entries = $event.target.value;
  }

  filterTable($event) {
    let val = $event.target.value;
    this.temp = this.rows.filter(function(d) {
      for (var key in d) {
        if (d[key].toLowerCase().indexOf(val) !== -1) {
          return true;
        }
      }
      return false;
    });
  }

  searchTable() {
    let object = this.searchInput;
    this.temp = this.rows.filter(function(d) {
      for (var key in object) {
        if (object[key]) {
          if (d[key].toLowerCase().indexOf(object[key]) !== -1) return true;
        }
      }
      return false;

      // let status = true;

      // // filter type
      // if (object.type) {
      //   status = d.type.toLowerCase().indexOf(object.type) !== -1;
      // }

      // // filter customer name
      // if (object.customerName) {
      //   status = d.customername.toLowerCase().indexOf(object.customerName) !== -1;
      // }

      // // filter email
      // if (object.email) {
      //   status = d.email.toLowerCase().indexOf(object.email) !== -1;
      // }

      // // filter account number
      // if (object.accountNumber) {
      //   status = d.accountnumber.toLowerCase().indexOf(object.accountNumber) !== -1;
      // }

      // return status;
    });
  }

  resetTable() {
    this.temp = this.rows;

    this.searchInput.changerequestid = "";
    this.searchInput.changeorder = "";
  }

  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  onActivate(event) {
    this.activeRow = event.row;
  }

  // Modal Add New Customer
  open(content, type, modalDimension, processTitle) {
    this.processTitle = processTitle;
    // if (modalDimension === "sm" && type === "modal_mini") {
    this.modalService
      .open(content, {
        windowClass: "modal-mini",
        centered: true
      })
      .result.then(
        result => {
          this.closeResult = "Closed with: $result";
        },
        reason => {
          this.closeResult = "Dismissed $this.getDismissReason(reason)";
        }
      );
    // }
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return "with: $reason";
    }
  }

  edit(row, content) {
    this.formInput = row;
    this.open(content, "modal-mini", "sm", "Edit");
  }

  delete() {
    swal
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        type: "warning",
        showCancelButton: true,
        buttonsStyling: false,
        confirmButtonClass: "btn btn-danger",
        confirmButtonText: "Yes, delete it!",
        cancelButtonClass: "btn btn-secondary"
      })
      .then(result => {
        if (result.value) {
          // Show confirmation
          swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            type: "success",
            buttonsStyling: false,
            confirmButtonClass: "btn btn-primary"
          });
        }
      });
  }

  initChart() {
    let chart = am4core.create("chartdiv", am4charts.XYChart);

    // Create daily series and related axes
    let dateAxis1 = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis1.renderer.grid.template.location = 0;
    dateAxis1.renderer.minGridDistance = 40;

    let valueAxis1 = chart.yAxes.push(new am4charts.ValueAxis());

    let series1 = chart.series.push(new am4charts.ColumnSeries());
    series1.dataFields.valueY = "value";
    series1.dataFields.dateX = "date";
    series1.data = generateDailyData();
    series1.xAxis = dateAxis1;
    series1.yAxis = valueAxis1;
    series1.tooltipText = "{dateX}: [bold]{valueY}[/]";

    // Create hourly series and related axes
    let dateAxis2 = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis2.renderer.grid.template.location = 0;
    dateAxis2.renderer.minGridDistance = 40;
    dateAxis2.renderer.labels.template.disabled = true;
    dateAxis2.renderer.grid.template.disabled = true;
    dateAxis2.renderer.tooltip.disabled = true;

    let valueAxis2 = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis2.renderer.opposite = true;
    valueAxis2.renderer.grid.template.disabled = true;
    valueAxis2.renderer.labels.template.disabled = true;
    valueAxis2.renderer.tooltip.disabled = true;

    let series2 = chart.series.push(new am4charts.LineSeries());
    series2.dataFields.valueY = "value";
    series2.dataFields.dateX = "date";
    series2.data = generateHourlyData();
    series2.xAxis = dateAxis2;
    series2.yAxis = valueAxis2;
    series2.strokeWidth = 3;
    series2.tooltipText =
      "{dateX.formatDate('yyyy-MM-dd hh:00')}: [bold]{valueY}[/]";

    // Add cursor
    chart.cursor = new am4charts.XYCursor();

    function generateDailyData() {
      let firstDate = new Date();
      firstDate.setDate(firstDate.getDate() - 10);
      firstDate.setHours(0, 0, 0, 0);
      let data = [];
      for (var i = 0; i < 10; i++) {
        let newDate = new Date(firstDate);
        newDate.setDate(newDate.getDate() + i);
        data.push({
          date: newDate,
          value: Math.round(Math.random() * 12) + 1
        });
      }
      return data;
    }

    function generateHourlyData() {
      let firstDate = new Date();
      firstDate.setDate(firstDate.getDate() - 10);
      let data = [];
      for (var i = 0; i < 10 * 24; i++) {
        let newDate = new Date(firstDate);
        newDate.setHours(newDate.getHours() + i);
        let value = 0;
        if (i == 0) {
          value = Math.round(Math.random() * 10) + 1;
        } else {
          value =
            Math.round(
              (data[data.length - 1].value / 100) *
                (90 + Math.round(Math.random() * 20)) *
                100
            ) / 100;
        }
        data.push({
          date: newDate,
          value: value
        });
      }
      return data;
    }
  }

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => {
      this.initChart();
    });
  }
}
