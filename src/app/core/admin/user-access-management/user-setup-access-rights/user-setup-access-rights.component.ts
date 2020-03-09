import { Component, OnInit, NgZone } from "@angular/core";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import * as UserAccesses from "src/app/variables/user-accesses";
import swal from "sweetalert2";

export enum SelectionType {
  single = "single",
  multi = "multi",
  multiClick = "multiClick",
  cell = "cell",
  checkbox = "checkbox"
}

@Component({
  selector: "app-user-setup-access-rights",
  templateUrl: "./user-setup-access-rights.component.html",
  styleUrls: ["./user-setup-access-rights.component.scss"]
})
export class UserSetupAccessRightsComponent implements OnInit {
  entries: number = 5;
  selected: any[] = [];
  temp = [];
  activeRow: any;
  rows = UserAccesses.UserAccesses;
  SelectionType = SelectionType;

  // dropdowns
  roles = ['admin', 'user', 'headquarters', 'branch', 'department'];
  modules = ['user access', 'network geography', 'planning', 'delivery and rollout', 'acceptance and approval', 'asset management'];
  actions = ['create', 'read', 'update', 'delete'];

  // searchInput
  searchInput = {
    username: "",
    email: "",
    role: "",
    module: "",
    action: ""
  };

  // formInput
  formInput = {
    username: "",
    email: "",
    role: "",
    module: "",
    action: ""
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
          if (d[key].toLowerCase().indexOf(object[key]) !== -1) 
            return true
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

    this.searchInput.username = "";
    this.searchInput.email = "";
    this.searchInput.role = "";
    this.searchInput.module = "";
    this.searchInput.action = "";
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
    this.open(content, 'modal-mini', 'sm', 'Edit');
  }

  delete(){
    swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        buttonsStyling: false,
        confirmButtonClass: 'btn btn-danger',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonClass: 'btn btn-secondary'
    }).then((result) => {
        if (result.value) {
            // Show confirmation
            swal.fire({
                title: 'Deleted!',
                text: 'Your file has been deleted.',
                type: 'success',
                buttonsStyling: false,
                confirmButtonClass: 'btn btn-primary'
            });
        }
    })
  }

  ngOnInit() {}
}
