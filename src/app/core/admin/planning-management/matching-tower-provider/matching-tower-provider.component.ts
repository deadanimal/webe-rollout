import { Component, OnInit, NgZone } from "@angular/core";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import * as MatchingTowerProviders from "src/app/variables/matching-tower-providers";
import swal from "sweetalert2";
import * as L from 'leaflet';

export enum SelectionType {
  single = "single",
  multi = "multi",
  multiClick = "multiClick",
  cell = "cell",
  checkbox = "checkbox"
}

@Component({
  selector: "app-matching-tower-provider",
  templateUrl: "./matching-tower-provider.component.html",
  styleUrls: ["./matching-tower-provider.component.scss"]
})
export class MatchingTowerProviderComponent implements OnInit {
  entries: number = 5;
  selected: any[] = [];
  temp = [];
  activeRow: any;
  rows = MatchingTowerProviders.MatchingTowerProviders;
  SelectionType = SelectionType;

  // leaflet
  leafletOptions = {
    layers: [
      L.tileLayer(
        'http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
        {
          maxZoom: 20,
          subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
        }
      )
    ],
    zoom: 9,
    center: L.latLng(3.0738, 101.5183)
  };
  public markers = [];

  // searchInput
  searchInput = {
    siteid: "",
    antenna: "",
    txrequirement: ""
  };

  // formInput
  formInput = {
    siteid: "",
    latitude: 0,
    longitude: 0,
    antenna: "",
    rrusarheight: 0,
    txrequirement: ""
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

    this.searchInput.siteid = "";
    this.searchInput.antenna = "";
    this.searchInput.txrequirement = "";
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

  ngOnInit() {
    this.addMarker();
  }

  addMarker() {
		let marker1 = L.marker(
			[2.940298, 101.47522],
			{
				icon: L.icon({
					iconSize: [ 25, 41 ],
					iconAnchor: [ 13, 41 ],
					iconUrl: 'assets/img/marker/marker-green.svg'
				})
			}
		);
    this.markers.push(marker1);
    let marker2 = L.marker(
			[3.196735, 101.431274],
			{
				icon: L.icon({
					iconSize: [ 25, 41 ],
					iconAnchor: [ 13, 41 ],
					iconUrl: 'assets/img/marker/marker-red.svg'
				})
			}
		);
    this.markers.push(marker2);
    let marker3 = L.marker(
			[3.126804, 101.862488],
			{
				icon: L.icon({
					iconSize: [ 25, 41 ],
					iconAnchor: [ 13, 41 ],
					iconUrl: 'assets/img/marker/marker-yellow.svg'
				})
			}
		);
		this.markers.push(marker3);
	}
}
