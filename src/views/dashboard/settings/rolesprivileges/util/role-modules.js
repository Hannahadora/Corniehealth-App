export default [
  {
    id: "13756a48-a2da-46a0-86e8-4c9a2afacf8e",
    name: "Settings",
    slug: "settings",
    isFree: true,
    monthlyPrice: "0",
    annuallyPrice: "0",
    description: "",
    submodules: [
      {
        id: "9be7b5ec-5382-4ce8-be05-c8b3d75c6cf2",
        name: "Time-Off (Leave Settings)",
        slug: "timeOffLeaveSettings",
        privileges: [
          {
            id: "54d16cb2-bbae-4d6b-a158-ed4b077657af",
            name: "Edit Leave Categories",
            slug: "editLeaveCategories",
          },
          {
            id: "cb735610-f89a-4cd1-9276-27c6d3932744",
            name: "View Leave Settings",
            slug: "viewLeaveSettings",
          },
          {
            id: "b58a2a98-6a3e-4765-897b-e1ab2ccf55ae",
            name: "Add New Category",
            slug: "addNewCategory",
          },
          {
            id: "cd5e0b68-0e5f-408a-b44e-62ce1d55fd86",
            name: "Delete Category",
            slug: "deleteCategory",
          },
        ],
      },
      {
        id: "897c0583-2ea5-46a6-9390-db2b9819b4ce",
        name: "Users & Roles",
        slug: "usersAndRoles",
        privileges: [
          {
            id: "c4ce64f9-1b79-4988-bcd8-d5bdf7d612ec",
            name: "Create New Role",
            slug: "createNewRole",
          },
          {
            id: "bf490023-854b-45c9-ae73-0818bd0386c4",
            name: "Edit Role",
            slug: "editRole",
          },
          {
            id: "c043e707-48b5-4625-9742-a27942db7e3b",
            name: "View Users & Roles Settings",
            slug: "viewUsersAndRolesSettings",
          },
          {
            id: "ff1cfa0d-a2ec-49b3-ac11-599e9f7310d7",
            name: "Edit User",
            slug: "editUser",
          },
          {
            id: "778a2eb2-3b4b-48eb-ab50-0f83c06707e3",
            name: "Create New User",
            slug: "createNewUser",
          },
          {
            id: "d5be53da-8c43-4656-800c-b55666e8f0cd",
            name: "Delete Role",
            slug: "deleteRole",
          },
        ],
      },
      {
        id: "ed318b69-ac48-4060-b992-4ecb6f7d999f",
        name: "Pay Schedule",
        slug: "paySchedule",
        privileges: [
          {
            id: "ed318b69-ac48-4060-b992-4ecb6f7d999f",
            name: "Edit Pay Schedule",
            slug: "editPaySchedule",
          },
          {
            id: "2f4f693b-692b-4c0e-a37a-a2ace908dd5f",
            name: "View Pay Schedule",
            slug: "viewPaySchedule",
          },
        ],
      },
      {
        id: "203d3fa3-7942-4a28-aaa0-1fe956f443f8",
        name: "Pension",
        slug: "pension",
        privileges: [
          {
            id: "203d3fa3-7942-4a28-aaa0-1fe956f443f8",
            name: "Edit PFA",
            slug: "editPFA",
          },
          {
            id: "f6283077-6d56-4bfa-adea-3c5234fae409",
            name: "View PFAs",
            slug: "viewPFAs",
          },
          {
            id: "f744478d-ae3d-4a67-8aaf-3c58955b74ab",
            name: "Disable Pension",
            slug: "disablePension",
          },
          {
            id: "78fdf40b-728d-460c-a10f-ad1c14da38aa",
            name: "Delete PFA",
            slug: "deletePFA",
          },
          {
            id: "5f9cc147-8a72-45eb-87f4-ed60c1ad36a9",
            name: "Add New PFA",
            slug: "addNewPFA",
          },
          {
            id: "e875a894-30e3-4fae-b4b9-5ff5c8a1e7f6",
            name: "Edit Pension Contribution Settings",
            slug: "editPensionContributionSettings",
          },
        ],
      },
      {
        id: "d347726f-b341-4901-a5cd-38f994f470dd",
        name: "Pay settings",
        slug: "paySettings",
        privileges: [
          {
            id: "ad47726f-b341-4901-a5cd-38f994f40938",
            name: "View Pay Settings",
            slug: "viewPaySettings",
          },
          {
            id: "a0b1d5a3-f427-4771-8660-c098b25d09ed",
            name: "Edit Pay Item",
            slug: "editPayItem",
          },
          {
            id: "30b1d5a3-f427-4771-8660-c098b25d5836",
            name: "Add New Pay Item",
            slug: "addNewPayItem",
          },
          {
            id: "36f552f4-cefa-4675-adad-7df545451c8d",
            name: "Delete Pay Item",
            slug: "deletePayItem",
          },
        ],
      },
      {
        id: "d8e16971-946b-48ef-b999-5412e31583a6",
        name: "Profile",
        slug: "profile",
        privileges: [
          {
            id: "9ebd0237-6c8e-4cd0-baff-8537720b78a4",
            name: "Edit Account Profile Information",
            slug: "editAccountProfileInformation",
          },
        ],
      },
    ],
  },
  {
    id: "0a28bcc0-79b6-441f-8c66-da1004090987",
    name: "Organization and People",
    slug: "orgAndPeople",
    isFree: false,
    monthlyPrice: "499",
    annuallyPrice: "399",
    description: "",
    submodules: [
      {
        id: "d29e15cd-186b-48f4-afcc-7962c1c646e1",
        name: "People",
        slug: "people",
        privileges: [
          {
            id: "882358f2-9b37-43e4-9e1f-edfa8a8c74c0",
            name: "Create New People",
            slug: "createNewPeople",
          },
          {
            id: "a782557e-8889-4e3d-bb10-705e70e3be68",
            name: "Edit People",
            slug: "editPeople",
          },
        ],
      },
      {
        id: "e0d360a2-6b5a-438a-82ff-a53f4d7346f1",
        name: "Job Levels",
        slug: "jobLevels",
        privileges: [
          {
            id: "5e1f7614-2f69-46ad-9488-03abe6f8ed13",
            name: "Delete Job Level",
            slug: "deleteJobLevel",
          },
          {
            id: "fcc7ebc8-46d3-4aa4-86f3-274203c4c76a",
            name: "Edit Job Level",
            slug: "editJobLevel",
          },
          {
            id: "4bfdbc0b-0fa6-47ad-ae3a-af69ed92475e",
            name: "Add New Job Level",
            slug: "addNewJobLevel",
          },
        ],
      },
      {
        id: "9997cb5d-7898-489b-ba60-b51620a98fea",
        name: "Functional Hierarchy",
        slug: "functionalHierarchy",
        privileges: [
          {
            id: "5f310f99-d165-4bf2-9381-5aa1eea266d4",
            name: "View Org. Structure",
            slug: "viewOrgStructure",
          },
          {
            id: "628e3d42-a9e5-4c94-9344-e9e81ae8a02f",
            name: "Delete Functions",
            slug: "deleteFunctions",
          },
          {
            id: "a5d67945-a190-4f57-8d29-dc9c9c7958b4",
            name: "Edit Functions",
            slug: "editFunctions",
          },
          {
            id: "0e97cb5d-7898-489b-ba60-b51620a09897",
            name: "Add Functions",
            slug: "addFunctions",
          },
          {
            id: "5b36d3ef-1796-4faf-aa1c-bcde2cd1a20a",
            name: "View KPI Summary Details",
            slug: "viewKpiSummaryDetails",
          },
        ],
      },
      {
        id: "1b07c3a1-fcc7-4d63-b69e-bc01badcce21",
        name: "Designation",
        slug: "designation",
        privileges: [
          {
            id: "fe427db3-55b6-4739-a0eb-9d35922ebb38",
            name: "Delete Designation",
            slug: "deleteDesignation",
          },
          {
            id: "6b07c3a1-fcc7-4d63-b69e-bc01badc0908",
            name: "Edit Designation",
            slug: "editDesignation",
          },
          {
            id: "989eec0b-6250-4c72-a4f4-46cdad568797",
            name: "Add New Designation",
            slug: "addNewDesignation",
          },
        ],
      },
    ],
  },
  {
    id: "fa356a48-a2da-46a0-86e8-4c9a2afac235",
    name: "Location and Tax",
    slug: "locationAndTax",
    isFree: true,
    monthlyPrice: "0",
    annuallyPrice: "0",
    description: "",
    submodules: [
      {
        id: "2ef6f693-db5e-4780-8265-d280ecfff427",
        name: "Location & Tax",
        slug: "locationAndTax",
        privileges: [
          {
            id: "ab2d3166-c77c-4d9b-bfde-b8a24a1b3d27",
            name: "Add New Location",
            slug: "addNewLocation",
          },
          {
            id: "519c17d8-eedc-49b9-a1e8-e62630a8421f",
            name: "Edit Tax Jurisdiction",
            slug: "editTaxJurisdiction",
          },
          {
            id: "4c2e0a3d-46ad-4ae9-8a4b-b3dd3ad08671",
            name: "Setup Tax Remittance Option",
            slug: "setupTaxRemittanceOption",
          },
          {
            id: "bcc5029f-4c86-486f-8119-dfb3aafaf856",
            name: "Delete Tax Jurisdiction",
            slug: "deleteTaxJurisdiction",
          },
          {
            id: "dd0ab50f-c84b-4586-a420-e23abdba54d3",
            name: "Edit Tax Remittance Option",
            slug: "editTaxRemittanceOption",
          },
          {
            id: "d0cef6af-75f5-46e9-99cb-7c8b0810676d",
            name: "Delete Location",
            slug: "deleteLocation",
          },
          {
            id: "a81e3d08-636c-4619-af7c-99e5121cb872",
            name: "Edit Location",
            slug: "editLocation",
          },
          {
            id: "9078bc12-0ec9-4085-9f53-f0fa323bcc7f",
            name: "View Location & Tax Settings",
            slug: "viewLocationAndTaxSettings",
          },
        ],
      },
      {
        id: "a41e5fb3-9688-47f8-96cd-54a02a017bdd",
        name: "Tax",
        slug: "tax",
        privileges: [
          {
            id: "c63622fb-9fc1-46f8-9c00-a11237fdc806",
            name: "View Tax Jurisdiction",
            slug: "viewTaxJurisdiction",
          },
        ],
      },
      {
        id: "775bf9ce-89f8-4be5-92ce-17a3ea5be389",
        name: "Location",
        slug: "location",
        privileges: [
          {
            id: "74b753c1-4274-4a98-a141-b9239be16dc4",
            name: "View Location Details",
            slug: "viewLocationDetails",
          },
        ],
      },
    ],
  },
  {
    id: "fa356a48-a2da-46a0-86e8-4c9a2afac097",
    name: "Employees",
    slug: "employees",
    isFree: true,
    monthlyPrice: "0",
    annuallyPrice: "0",
    description: "",
    submodules: [
      {
        id: "888e5757-15ec-4375-97e0-066e894ef6a5",
        name: "Groups",
        slug: "groups",
        privileges: [
          {
            id: "fccb5289-d59c-496f-b4cf-60690039b117",
            name: "Edit Group Details",
            slug: "editGroupDetails",
          },
          {
            id: "93720f8a-7683-4b02-b323-9eb86896e60c",
            name: "Add Employee to Groups",
            slug: "addEmployeeToGroups",
          },
          {
            id: "f20decf0-2ae5-4c9b-9fa4-266dcbcaf346",
            name: "View Group Members",
            slug: "viewGroupMembers",
          },
          {
            id: "fd31c1cd-eda3-4468-9679-f0fd89940eec",
            name: "View Groups",
            slug: "viewGroups",
          },
          {
            id: "8e8af761-8551-4ec3-b5e8-8a01abb48d62",
            name: "Create New Group",
            slug: "createNewGroup",
          },
          {
            id: "a615bf27-e2a8-4bd3-990b-2c1fd5da7c66",
            name: "Delete Group",
            slug: "deleteGroup",
          },
          {
            id: "36438920-36e8-4609-9721-c6957797d495",
            name: "Remove Employees from a Group",
            slug: "removeEmployeesFromAGroup",
          },
        ],
      },
      {
        id: "a702e8c5-b182-4e31-95fd-a930d2062fc0",
        name: "Employee Directory",
        slug: "employeeDirectory",
        privileges: [
          {
            id: "3f422ed6-b966-4db7-bc52-3d896063dad0",
            name: "Activate Employee",
            slug: "activateEmployee",
          },
          {
            id: "9b3f7bde-9835-4211-b3f9-65a052605dfc",
            name: "Add Employees",
            slug: "addEmployee",
          },
          {
            id: "ba37b1ad-eb99-4296-88d2-2602f4970114",
            name: "Invite Employees to Update Account",
            slug: "inviteEmployeesToUpdateAccount",
          },
          {
            id: "bb3f7bde-9835-4211-b3f9-65a052605356",
            name: "Deactivate Employee",
            slug: "deactivateEmployee",
          },
        ],
      },
      {
        id: "c29c33eb-b3d1-4a7d-a2eb-64daffc121af",
        name: "Employee Personal Information",
        slug: "employeePersonalInformation",
        privileges: [
          {
            id: "45db53c0-7de5-45f4-9bd1-a30ae789cf9f",
            name: "Edit Employee Personal Information",
            slug: "editEmployeePersonalInformation",
          },
        ],
      },
      {
        id: "43a3c4f7-4d1a-416e-bcf1-699b27b46183",
        name: "Employement Information",
        slug: "employementInformation",
        privileges: [
          {
            id: "bb7fe309-9c51-4090-a518-9ec2ae3a18f4",
            name: "Edit Employement Information",
            slug: "editEmployementInformation",
          },
        ],
      },
      {
        id: "6278ac1c-cddb-4b15-96d1-d8584a8a8afd",
        name: "Pay Information",
        slug: "payInformation",
        privileges: [
          {
            id: "ca9579a1-e283-4992-80d1-52758a0b9df2",
            name: "Edit Pay Information",
            slug: "editPayInformation",
          },
        ],
      },
    ],
  },
  {
    id: "fa356a48-a2da-46a0-86e8-4c9a2afacf8e",
    name: "Payroll(PAYE & Pension)",
    slug: "payroll",
    isFree: false,
    monthlyPrice: "599",
    annuallyPrice: "479",
    description: null,
    submodules: [
      {
        id: "d06ad476-88a0-405b-b9da-e92082f7f7ca",
        name: "Pay Run ",
        slug: "payRun",
        privileges: [
          {
            id: "7371b14b-fbdc-4050-a961-618822967b99",
            name: "Reject Pay Run",
            slug: "rejectPayRun",
          },
          {
            id: "664f25bf-7c41-4995-92f2-5bc1a27b485f",
            name: "Approve Pay Run",
            slug: "approvePayRun",
          },
          {
            id: "423bd94f-e64c-443f-9b20-580ecec2da68",
            name: "Comment on Pay Run",
            slug: "commentOnPayRun",
          },
          {
            id: "ee85fdfe-d7f0-42ac-a982-a5939c8db2d8",
            name: "Initiate New Pay Run",
            slug: "initiateNewPayRun",
          },
          {
            id: "eb77d53f-84a4-4dcd-a344-36424a200e7c",
            name: "Manage Variable Pay",
            slug: "manageVariablePay",
          },
          {
            id: "da55cd25-55f1-45bb-8e62-2cdf0d3290b6",
            name: "Save as Draft",
            slug: "saveAsDraft",
          },
          {
            id: "d8fe4579-cb83-448e-943e-9a90d94c8d91",
            name: "Submit Pay Run",
            slug: "submitPayRun",
          },
          {
            id: "b7115b20-5463-4658-a4a9-f765cc75a7dc",
            name: "View Draft Pay Run",
            slug: "viewDraftPayRun",
          },
          {
            id: "bd619b2e-34a9-4d3b-b659-6e3351cb35ad",
            name: "Delete Draft Pay Run",
            slug: "deleteDraftPayRun",
          },
          {
            id: "e32f268a-2b83-4b3e-9079-3c87ab3e7f9f",
            name: "Return for Review",
            slug: "returnForReview",
          },
          {
            id: "993eea7c-08b8-438a-9338-a16fd239f2d0",
            name: "Search Submitted Pay Run",
            slug: "searchSubmittedPayRun",
          },
          {
            id: "7e30e326-2ce1-4da4-bcf2-63bf73179831",
            name: "View Submitted Pay Run",
            slug: "viewSubmittedPayRun",
          },
        ],
      },
      {
        id: "65356a48-a2da-46a0-86e8-4c9a2afac432",
        name: "Employees",
        slug: "employees",
        privileges: [
          {
            id: "9ca82986-c9a5-40bb-83bd-718deefee92e",
            name: "View inactive employees",
            slug: "viewInactiveEmployees",
          },
          {
            id: "9ca82986-c9a5-40bb-83bd-718deefee093",
            name: "View active employees",
            slug: "viewActiveEmployees",
          },
        ],
      },
      {
        id: "872f7cd3-363f-4c70-8dc4-2f14154cfe8b",
        name: "Dashboard",
        slug: "dashboard",
        privileges: [
          {
            id: "f9427ee4-5bf6-46df-a5a2-b094524d77b5",
            name: "Access Payroll Dashboard",
            slug: "accessPayrollDashboard",
          },
        ],
      },
      {
        id: "50fab1a9-a129-47be-b23b-bf729a952a12",
        name: "Pension",
        slug: "pension",
        privileges: [
          {
            id: "2dc1102d-5895-4770-8346-54f9cd9e7edc",
            name: "Remitt Pension",
            slug: "remittPension",
          },
          {
            id: "5273e38c-8243-47ce-8e15-769e013d187a",
            name: "View Current Pension Remittance",
            slug: "viewCurrentPensionRemittance",
          },
        ],
      },
      {
        id: "7720f13e-8c00-49f8-a054-8813b291f74d",
        name: "PAYE",
        slug: "paye",
        privileges: [
          {
            id: "6bfed05c-c40b-4a7d-95c4-949191c4f41a",
            name: "Remitt PAYE",
            slug: "remittPAYE",
          },
          {
            id: "9ca82986-c9a5-40bb-83bd-718deefeedef",
            name: "View Current PAYE Remmitance",
            slug: "viewCurrentPAYERemmitance",
          },
        ],
      },
    ],
  },
  {
    id: "0a28bcc0-79b6-441f-8c66-da10040993cf",
    name: "Benefits",
    slug: "benefits",
    isFree: false,
    monthlyPrice: "499",
    annuallyPrice: "399",
    description: "",
    submodules: [
      {
        id: "13848717-2b83-401c-ad4b-60bc833323bb",
        name: "Advance & Loans",
        slug: "advanceAndLoans",
        privileges: [
          {
            id: "689b6891-9b1f-47d7-8f97-60bbb44df40d",
            name: "View Advance and loans",
            slug: "viewAdvanceAndLoans",
          },
        ],
      },
      {
        id: "fa896303-4634-4406-979b-3a9a3db3094c",
        name: "Leave",
        slug: "leave",
        privileges: [
          {
            id: "2f00b107-d5dd-4c79-b8d6-bf4d0a0e6a65",
            name: "View Leave",
            slug: "viewLeave",
          },
        ],
      },
      {
        id: "06f52b4a-9596-4f2e-879d-10632ac263c5",
        name: "Overtime",
        slug: "overtime",
        privileges: [
          {
            id: "68dd265b-8b09-4db2-bcaa-18e7c6560ef3",
            name: "View Overtime",
            slug: "viewOvertime",
          },
        ],
      },
    ],
  },
];
