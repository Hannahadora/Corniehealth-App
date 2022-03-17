import EPracticeType from "@/types/practice-type";

interface ISidebarLink {
  name: string;
  to: string | { name: string };
  icon?: string;
  hasSubsection: boolean;
  children?: ISidebarLink[];
}

const links: ISidebarLink[] = [
  {
    name: "Dashboard",
    to: "home",
    icon: "dashboard-icon",
    hasSubsection: false,
  },
  {
    name: "Experience",
    to: "experience",
    icon: "patient-icon",
    hasSubsection: true,
    children: [
      { name: "Patients", to: { name: "Patients" }, hasSubsection: false },
      {
        name: "Calendar",
        to: "/dashboard/experience/calendar",
        hasSubsection: false,
      },
      // {
      //   name: "Schedules",
      //   to: "/dashboard/experience/schedules",
      //   hasSubsection: false,
      // },
      // {
      //   name: "Appointments",
      //   to: { name: "Appointment" },
      //   hasSubsection: false,
      // },
      {
        name: "Visits",
        to: "/dashboard/experience/visits",
        hasSubsection: false,
      },
      { name: "Requests", to: { name: "Requests" }, hasSubsection: false },
      { name: "Tasks", to: { name: "Tasks" }, hasSubsection: false },
      {
        name: "Messaging",
        to: "/dashboard/experience/messages",
        hasSubsection: false,
      },
      {
        name: "Satisfaction & Ratings",
        to: "/dashboard/experience/ratings",
        hasSubsection: false,
      },
      {
        name: "Questionaires",
        to: "/dashboard/experience/questionaires",
        hasSubsection: false,
      },
    ],
  },
  {
    name: "Clinical",
    to: "clinical",
    icon: "book-icon",
    hasSubsection: false,
  },
  {
    name: "In-Patient",
    to: "in-patient",
    icon: "clinic-icon",
    hasSubsection: false,
  },
  {
    name: "Diagnostics",
    to: "diagnostics",
    icon: "clip-board-icon",
    hasSubsection: false,
  },
  {
    name: "Medications",
    to: "medications",
    icon: "pill-icon",
    hasSubsection: true,
    children: [
      {
        name: "Markup",
        to: "/dashboard/provider/settings/markup",
        hasSubsection: false,
      },
      {
        name: "Catalogue",
        to: "catologue",
        hasSubsection: false,
      },
      {
        name: "Inventory",
        to: "inventory",
        hasSubsection: false,
      },
      {
        name: "Pricebook",
        to: "pricebook",
        hasSubsection: false,
      },
    ],
  },

  {
    name: "Bills & Payments",
    to: "bills",
    icon: "debit-card-icon",
    hasSubsection: false,
  },
  {
    name: "Accounting",
    to: "accounting",
    icon: "wallet-icon",
    hasSubsection: false,
  },
  {
    name: "Analytics",
    to: "analytics",
    icon: "chart-icon",
    hasSubsection: false,
  },
  { name: "Referrals", to: "refs", icon: "refer-icon", hasSubsection: false },
];

const soloLinks = [
  {
    name: "Experience",
    to: "experience",
    icon: "patient-icon",
    hasSubsection: true,
    children: [
      { name: "Patients", to: { name: "Patients" }, hasSubsection: false },
      {
        name: "Schedules",
        to: "/dashboard/experience/schedules",
        hasSubsection: false,
      },
      {
        name: "Appointments",
        to: { name: "Appointment" },
        hasSubsection: false,
      },
      {
        name: "Visits",
        to: "/dashboard/experience/visits",
        hasSubsection: false,
      },
      { name: "Requests", to: { name: "Requests" }, hasSubsection: false },
      { name: "Tasks", to: { name: "Tasks" }, hasSubsection: false },
      {
        name: "Messaging",
        to: "/dashboard/experience/messages",
        hasSubsection: false,
      },
      {
        name: "Satisfaction & Ratings",
        to: "/dashboard/experience/ratings",
        hasSubsection: false,
      },
      {
        name: "Questionaires",
        to: "/dashboard/experience/questionaires",
        hasSubsection: false,
      },
    ],
  },
  {
    name: "Clinical",
    to: "clinical",
    icon: "book-icon",
    hasSubsection: false,
  },
  {
    name: "Billing & Payments",
    to: "bills",
    icon: "debit-card-icon",
    hasSubsection: false,
  },
  { name: "Referrals", to: "refs", icon: "refer-icon", hasSubsection: false },
];
export function getPracticeNav(type: EPracticeType) {
  if (type == EPracticeType.Solo) return soloLinks;
  return links;
}
