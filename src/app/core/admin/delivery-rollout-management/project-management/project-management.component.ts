import { Component, OnInit, NgZone } from "@angular/core";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import * as Projects from "src/app/variables/projects";
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
  selector: "app-project-management",
  templateUrl: "./project-management.component.html",
  styleUrls: ["./project-management.component.scss"]
})
export class ProjectManagementComponent implements OnInit {
  entries: number = 5;
  selected: any[] = [];
  temp = [];
  activeRow: any;
  rows = Projects.Projects;
  SelectionType = SelectionType;

  // dropdowns
  actions = [
    "add new project",
    "create sites",
    "upload file",
    "update site pictures"
  ];
  statuss = ["not started", "in progress", "complete"];

  // searchInput
  searchInput = {
    projectid: "",
    projecttitle: ""
  };

  // formInput
  formInput = {
    action: "",
    projectid: "",
    projecttitle: "",
    status: ""
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
          if (
            d[key]
              .toString()
              .toLowerCase()
              .indexOf(object[key].toString().toLowerCase()) !== -1
          )
            return true;
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

    this.searchInput.projectid = "";
    this.searchInput.projecttitle = "";
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
        centered: true,
        size: "lg"
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

  view(row, content) {
    this.formInput = row;
    this.open(content, "modal-mini", "sm", "View");
  }

  gallery(row, content) {
    this.formInput = row;
    this.open(content, "modal-mini", "sm", "View");
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
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

    chart.paddingRight = 30;
    chart.dateFormatter.inputDateFormat = "yyyy-MM-dd HH:mm";

    let colorSet = new am4core.ColorSet();
    colorSet.saturation = 0.4;

    chart.data = [
      {
        category: "PROJECT836572",
        start: "2016-01-01",
        end: "2016-01-14",
        color: colorSet.getIndex(0).brighten(0),
        task: "Gathering requirements"
      },
      {
        category: "PROJECT836572",
        start: "2016-01-16",
        end: "2016-01-27",
        color: colorSet.getIndex(0).brighten(0.4),
        task: "Producing specifications"
      },
      {
        category: "PROJECT836572",
        start: "2016-02-05",
        end: "2016-04-18",
        color: colorSet.getIndex(0).brighten(0.8),
        task: "Development"
      },
      {
        category: "PROJECT836572",
        start: "2016-04-18",
        end: "2016-04-30",
        color: colorSet.getIndex(0).brighten(1.2),
        task: "Testing and QA"
      },
      {
        category: "PROJECT113867",
        start: "2016-01-08",
        end: "2016-01-10",
        color: colorSet.getIndex(2).brighten(0),
        task: "Gathering requirements"
      },
      {
        category: "PROJECT113867",
        start: "2016-01-12",
        end: "2016-01-15",
        color: colorSet.getIndex(2).brighten(0.4),
        task: "Producing specifications"
      },
      {
        category: "PROJECT113867",
        start: "2016-01-16",
        end: "2016-02-05",
        color: colorSet.getIndex(2).brighten(0.8),
        task: "Development"
      },
      {
        category: "PROJECT113867",
        start: "2016-02-10",
        end: "2016-02-18",
        color: colorSet.getIndex(2).brighten(1.2),
        task: "Testing and QA"
      },
      {
        category: "PROJECT594607",
        start: "2016-01-02",
        end: "2016-01-08",
        color: colorSet.getIndex(4).brighten(0),
        task: "Gathering requirements"
      },
      {
        category: "PROJECT594607",
        start: "2016-01-08",
        end: "2016-01-16",
        color: colorSet.getIndex(4).brighten(0.4),
        task: "Producing specifications"
      },
      {
        category: "PROJECT594607",
        start: "2016-01-19",
        end: "2016-03-01",
        color: colorSet.getIndex(4).brighten(0.8),
        task: "Development"
      },
      {
        category: "PROJECT594607",
        start: "2016-03-12",
        end: "2016-04-05",
        color: colorSet.getIndex(4).brighten(1.2),
        task: "Testing and QA"
      },
      {
        category: "PROJECT458201",
        start: "2016-01-01",
        end: "2016-01-19",
        color: colorSet.getIndex(6).brighten(0),
        task: "Gathering requirements"
      },
      {
        category: "PROJECT458201",
        start: "2016-01-19",
        end: "2016-02-03",
        color: colorSet.getIndex(6).brighten(0.4),
        task: "Producing specifications"
      },
      {
        category: "PROJECT458201",
        start: "2016-03-20",
        end: "2016-04-25",
        color: colorSet.getIndex(6).brighten(0.8),
        task: "Development"
      },
      {
        category: "PROJECT458201",
        start: "2016-04-27",
        end: "2016-05-15",
        color: colorSet.getIndex(6).brighten(1.2),
        task: "Testing and QA"
      },
      {
        category: "PROJECT772864",
        start: "2016-01-01",
        end: "2016-01-12",
        color: colorSet.getIndex(8).brighten(0),
        task: "Gathering requirements"
      },
      {
        category: "PROJECT772864",
        start: "2016-01-12",
        end: "2016-01-19",
        color: colorSet.getIndex(8).brighten(0.4),
        task: "Producing specifications"
      },
      {
        category: "PROJECT772864",
        start: "2016-01-19",
        end: "2016-03-01",
        color: colorSet.getIndex(8).brighten(0.8),
        task: "Development"
      },
      {
        category: "PROJECT772864",
        start: "2016-03-08",
        end: "2016-03-30",
        color: colorSet.getIndex(8).brighten(1.2),
        task: "Testing and QA"
      }
    ];

    chart.dateFormatter.dateFormat = "yyyy-MM-dd";
    chart.dateFormatter.inputDateFormat = "yyyy-MM-dd";

    let categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "category";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.inversed = true;

    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.minGridDistance = 70;
    dateAxis.baseInterval = { count: 1, timeUnit: "day" };
    // dateAxis.max = new Date(2018, 0, 1, 24, 0, 0, 0).getTime();
    //dateAxis.strictMinMax = true;
    dateAxis.renderer.tooltipLocation = 0;

    let series1 = chart.series.push(new am4charts.ColumnSeries());
    series1.columns.template.height = am4core.percent(70);
    series1.columns.template.tooltipText =
      "{task}: [bold]{openDateX}[/] - [bold]{dateX}[/]";

    series1.dataFields.openDateX = "start";
    series1.dataFields.dateX = "end";
    series1.dataFields.categoryY = "category";
    series1.columns.template.propertyFields.fill = "color"; // get color from data
    series1.columns.template.propertyFields.stroke = "color";
    series1.columns.template.strokeOpacity = 1;

    chart.scrollbarX = new am4core.Scrollbar();
  }

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => {
      this.initChart();
    });
  }
}
