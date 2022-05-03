import EPracticeType from "@/types/practice-type";

interface INav {
  name: string;
  to: string;
  icon: string;
}
interface ISetting {
  [state: string]: INav[];
}
const settings: ISetting = {
  "Account Info": [
    {
      name: "Practice Information",
      to: "practice-information",
      icon: "org-icon",
    },
    { name: "Contact Information", to: "contact-info", icon: "contact-icon" },
    { name: "KYC", to: "kyc", icon: "kyc-icon" },
    {
      name: "Locations",
      to: "locations",
      icon: "location-icon",
    },
    {
      name: "Organization Hierarchy",
      to: "org-hierarchy",
      icon: "hierarchy-icon",
    },
  ],
  "Users & Security": [
    {
      name: "Account Security",
      to: "account-security",
      icon: "security-icon",
    },
    { name: "Domains", to: "domains", icon: "domain-icon" },
    { name: "Practitioners", to: "practitioners", icon: "practitioner-icon" },
    { name: "Group", to: "group", icon: "group-icon" },
    { name: "Care Team", to: "care-teams", icon: "team-icon" },
    {
      name: "Roles and Privileges",
      to: "roles-privileges",
      icon: "roles-icon",
    },
    { name: "Approval", to: "approval", icon: "approval-icon" },
  ],
  Commercial: [
    {
      name: "Charge Description Master",
      to: "charge-description-master",
      icon: "health-service-icon",
    },
    { name: "Markup & Discounts", to: "markup", icon: "markup-icon" },
    { name: "Devices", to: "devices", icon: "devices-icon" },
    { name: "Care Partners", to: "care-partners", icon: "partners-icon" },
    { name: "Billing Accounts", to: "bank-accounts", icon: "bank-icon" },
  ],
  "Practice Management": [
    {
      name: "Forms & Questionnaires",
      to: "practise-management/forms-questionnaires",
      icon: "templates-icon",
    },
    {
      name: "Booking Site",
      to: "practise-management/booking-site",
      icon: "security-icon",
    },
  ],
};

const soloSettings = {
  "Account Info": [
    {
      name: "Practice Information",
      to: "practice-information",
      icon: "org-icon",
    },
    { name: "Contact Information", to: "contact-info", icon: "contact-icon" },
    { name: "KYC", to: "kyc", icon: "kyc-icon" },
  ],
  "Users & Security": [
    {
      name: "Account Security",
      to: "account-security",
      icon: "security-icon",
    },
  ],
  Commercial: [
    {
      name: "Charge Description Master",
      to: "charge-description-master",
      icon: "health-service-icon",
    },
    { name: "Markup & Discounts", to: "markup", icon: "markup-icon" },
    { name: "Billing Accounts", to: "bank-accounts", icon: "bank-icon" },
  ],
  "Practice Management": [
    { name: "Groups", to: "group", icon: "group-icon" },
    {
      name: "Forms & Questionnaires",
      to: "practise-management/forms-questionnaires",
      icon: "templates-icon",
    },
    {
      name: "Booking Site",
      to: "practise-management/booking-site",
      icon: "security-icon",
    },
    { name: "Care Partners", to: "care-partners", icon: "partners-icon" },
  ],
};
export function getPracticeSettings(type: EPracticeType) {
  if (type == EPracticeType.Solo) return soloSettings;
  return settings;
}
