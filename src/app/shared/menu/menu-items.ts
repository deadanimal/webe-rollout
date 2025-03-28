export interface RouteInfo {
  path: string;
  title: string;
  type: string;
  icontype: string;
  collapse?: string;
  isCollapsed?: boolean;
  isCollapsing?: any;
  children?: ChildrenItems[];
}

export interface ChildrenItems {
  path: string;
  title: string;
  type?: string;
  collapse?: string;
  children?: ChildrenItems2[];
  isCollapsed?: boolean;
}
export interface ChildrenItems2 {
  path?: string;
  title?: string;
  type?: string;
}
//Menu Items
export const ROUTES: RouteInfo[] = [
  {
    path: "/admin/dashboard",
    title: "Dashboard",
    type: "link",
    icontype: "fas fa-chart-bar text-primary"
  },
  {
    path: "/admin/user-access-management",
    title: "User Access Management",
    type: "sub",
    icontype: "fas fa-users text-default",
    collapse: "useraccess",
    isCollapsed: true,
    children: [
      {
        path: "user-setup-access-rights",
        title: "User Setup & Access Rights",
        type: "link"
      },
      { path: "user-matrix", title: "User Matrix", type: "link" },
      { path: "password", title: "Password", type: "link" },
      { path: "user-activity-log-reports", title: "User Activity Log Reports", type: "link" },
      { path: "network-geography", title: "Network Geography", type: "link" }
    ]
  },
  {
    path: "/admin/planning-management",
    title: "Planning Management",
    type: "sub",
    icontype: "fas fa-file-contract text-danger",
    collapse: "planning",
    isCollapsed: true,
    children: [
      { path: "matching-tower-provider", title: "Matching Tower Provider", type: "link" },
      { path: "site-selection-final-candidate", title: "Site Selection Final Candidate", type: "link" },
      { path: "purchase-request", title: "Purchase Request (PR)", type: "link" },
      { path: "change-request", title: "Change Request (CR)", type: "link" },
      { path: "boq-bom", title: "Bill of Quantity (BOQ) & Bill of Material (BOM)", type: "link" },
    ]
  },
  {
    path: "/admin/acceptance-approval-management",
    title: "Acceptance & Approval Management",
    type: "link",
    icontype: "fas fa-file text-dark"
  },
  {
    path: "/admin/delivery-rollout-management",
    title: "Delivery & Rollout Management",
    type: "sub",
    icontype: "fas fa-truck text-warning",
    collapse: "rollout",
    isCollapsed: true,
    children: [
      { path: "project-management", title: "Project Management", type: "link" },
      { path: "punchlist-management", title: "Punchlist Management", type: "link" },
      { path: "blocking-issues", title: "Blocking Issues", type: "link" },
      { path: "trouble-ticket-management", title: "Trouble Ticket Management", type: "link" }
    ]
  },
  {
    path: "/admin/asset-management",
    title: "Asset Management",
    type: "link",
    icontype: "fas fa-toolbox text-info"
  },
  {
    path: "/admin/reports",
    title: "Reports",
    type: "link",
    icontype: "fas fa-clipboard text-primary"
  },
  {
    path: "/admin/administration",
    title: "Administration",
    type: "sub",
    icontype: "fas fa-cogs text-success",
    collapse: "administration",
    isCollapsed: true,
    children: [
      { path: "user", title: "User", type: "link" },
      { path: "audit-trail", title: "Audit Trail", type: "link" }
    ]
  },
  {
    path: "/admin/helpdesk",
    title: "Helpdesk",
    type: "link",
    icontype: "fas fa-question text-primary"
  }
];
