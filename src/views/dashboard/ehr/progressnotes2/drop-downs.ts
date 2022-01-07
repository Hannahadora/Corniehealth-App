export async function categories() {
  return [
    { code: "109006", display: "Anxiety disorder of childhood OR adolescence" },
    { code: "122003", display: "Choroidal hemorrhage" },
    {
      code: "127009",
      display: "	Spontaneous abortion with laceration of cervix",
    },
    { code: "129007", display: "Homoiothermia" },
  ];
}

export const severities = [
  { code: "24484000", display: "Severe" },
  { code: "6736007", display: "Moderate" },
  { code: "255604002", display: "Mild" },
];

export const verificationStatuses = [
  "unconfirmed",
  "provisional",
  "differential",
  "confirmed",
  "refuted",
  "entered-in-error",
];

export const clinicalStatuses = [
  "active",
  "recurrence",
  "relapse",
  "inactive",
  "remission",
  "resolved",
];

export const codes = [
  { code: "109006", display: "Anxiety disorder of childhood OR adolescence" },
  { code: "122003", display: "Choroidal hemorrhage" },
  { code: "127009", display: "Spontaneous abortion with laceration of cervix" },
  { code: "129007", display: "Homoiothermia" },
  { code: "134006", display: "	Decreased hair growth" },
];

export const bodySites = [
  { code: "106004", display: "Posterior carpal region	" },
  { code: "107008", display: "Fetal part of placenta" },
  { code: "108003", display: "Condylar emissary vein" },
  { code: "110001", display: "Visceral layer of Bowman's capsule" },
  { code: "111002", display: "Parathyroid gland" },
];

export const stages = [
  { code: "106242004", display: "Walter Reed staging of prostatic cancer" },
  {
    code: "106244003",
    display: "FIGO staging system for endometrial carcinoma",
  },
  { code: "106245002", display: "FIGO Vulva tumor staging" },
  { code: "106246001", display: "FIGO staging system for vulvar melanoma" },
  {
    code: "106247005",
    display: "FIGO staging system for epithelial tumor of ovary",
  },
];

export const evidenceCodes = [
  { code: "109006", display: "Anxiety disorder of childhood OR adolescence" },
  { code: "122003", display: "Choroidal hemorrhage" },
  { code: "127009", display: "Spontaneous abortion with laceration of cervix" },
  { code: "129007", display: "Homoiothermia" },
  { code: "134006", display: "Decreased hair growth" },
  { code: "140004", display: "Chronic pharyngitis" },
];
