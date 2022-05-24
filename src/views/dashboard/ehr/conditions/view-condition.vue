<template>
  <clinical-dialog class="w-9/12" v-model="show" :title="item.id" noarrow>
    <div class="w-full flex flex-col pl-3">
      <org-card :organization="item.organization" />
      <div class="w-full grid grid-cols-2 pb-6 border-b-2 border-dashed">
        <patient-card :id="item?.patientId" />
        <div class="grid grid-cols-1 gap-y-1 text-sm">
          <h2 class="text-primary text-sm font-bold">Recorder and asserter</h2>
          <div class="grid grid-cols-1 gap-y-1">
            <span class="text-danger text-xs">Recorded By</span>
            <span>{{ recorder.name }} </span>
            <span class="text-gray-500 text-xs">{{ recorder.department }}</span>
            <span class="text-gray-500 text-xs">{{ recorder.date }}</span>
          </div>
          <div class="grid grid-cols-1 gap-y-1">
            <span class="text-danger text-xs">Asserted By</span>
            <span> Dr. Obi Nduka </span>
            <span class="text-gray-500 text-xs">Pathology</span>
            <span class="text-gray-500 text-xs">21/09/2021</span>
          </div>
        </div>
      </div>
      <div class="w-full grid grid-cols-2 mt-6 gap-x-4">
        <div class="grid grid-cols-1 gap-y-2">
          <span class="flex items-center text-danger font-semibold text-base">
            <condition-icon class="mr-2" />
            Condition Information
          </span>
          <div class="mt-2 grid grid-cols-3 gap-y-4">
            <div class="flex flex-col">
              <span class="text-sm text-gray-500"> Clinical Status </span>
              <span class="mt-1 text-xs text-black capitalize">
                {{ clinicalStatus.display }}</span
              >
            </div>
            <div class="flex flex-col">
              <span class="text-sm text-gray-500"> Verification Status </span>
              <span class="mt-1 text-xs text-black capitalize">
                {{ verificationStatus.display }}
              </span>
            </div>
            <div class="flex flex-col">
              <span class="text-sm text-gray-500"> Category </span>
              <span class="mt-1 text-xs text-black capitalize">
                {{ category.display }}
              </span>
            </div>
            <div class="flex flex-col">
              <span class="text-sm text-gray-500"> Severity </span>
              <span class="mt-1 text-xs text-black capitalize">
                {{ severity.display }}</span
              >
            </div>
            <div class="flex flex-col">
              <span class="text-sm text-gray-500"> Code </span>
              <span class="mt-1 text-xs text-black capitalize">
                {{ code.display }}
              </span>
            </div>
            <div class="flex flex-col">
              <span class="text-sm text-gray-500"> Body Site </span>
              <span class="mt-1 text-xs text-black capitalize">
                {{ bodySite.display }}
              </span>
            </div>
          </div>
          <div class="mt-3 flex flex-col">
            <span class="flex items-center font-bold">
              <note-icon class="mr-3" />
              Note
            </span>
            <p class="text-sm pt-3">
              {{ item.evidenceNote || "N/A" }}
            </p>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-y-3">
          <div>
            <span class="font-bold flex items-center text-lg">
              <onset-icon class="mr-3" />
              Onset
            </span>
            <div class="mt-5 grid grid-cols-2">
              <div class="flex flex-col">
                <span class="text-sm text-gray-500 mb-3">{{ onset.key }}</span>
                <span class="text-sm">{{ onset.text }}</span>
                <span class="text-sm text-gray-500 mb-3">
                  {{ onset.subtext || "" }}
                </span>
              </div>
            </div>
          </div>

          <div>
            <span class="font-bold flex items-center text-lg">
              <onset-icon class="mr-3" />
              Abatement
            </span>
            <div class="mt-5 grid grid-cols-2">
              <div class="flex flex-col">
                <span class="text-sm text-gray-500 mb-3 capitalize">
                  {{ abatement.key }}
                </span>
                <span class="text-sm">{{ abatement.text }}</span>
                <span class="text-sm text-gray-500 mb-3">
                  {{ abatement.subtext || "" }}
                </span>
              </div>
            </div>
          </div>

          <div>
            <span class="font-bold flex items-center text-lg">
              <stage-icon class="mr-3" />
              Stage
            </span>
            <div class="mt-3 grid grid-cols-2 gap-y-2">
              <div class="flex flex-col">
                <span class="text-sm text-gray-500 mb-3">Summary</span>
                <span class="text-sm">{{ item.summary || "" }}</span>
              </div>
              <div class="flex flex-col">
                <span class="text-sm text-gray-500 mb-3">Type</span>
                <span class="text-sm">{{ stage.display }}</span>
              </div>
            </div>
            <div class="flex flex-col mt-4">
              <span class="text-sm text-gray-500 mb-2">Assessment</span>
              <div class="flex items-center text-xs">
                <span class="text-sm font-semibold mr-2"> Spherophakia </span>
                ∘ XXXXX
              </div>
            </div>
          </div>

          <div>
            <span class="font-bold flex items-center text-lg">
              <note-icon class="mr-3" />
              Evidence
            </span>
            <div class="mt-3 grid grid-cols-2">
              <div class="flex flex-col">
                <span class="text-sm text-gray-500 mb-3">Code</span>
                <span class="text-sm">XXXXXXXXX</span>
              </div>
              <div class="flex flex-col">
                <span class="text-sm text-gray-500 mb-3">Details</span>
                <span class="text-sm">{{ item.detail }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <template #actions>
      <cornie-btn
        class="border-primary border px-6 mr-3 rounded-xl text-primary"
      >
        Edit
      </cornie-btn>
    </template>
  </clinical-dialog>
</template>
<script lang="ts">
import { Options, setup, Vue } from "vue-class-component";
import { Prop, PropSync } from "vue-property-decorator";
import ClinicalDialog from "./clinical-dialog.vue";
import Avatar from "@/components/avatar.vue";
import ConditionIcon from "@/components/icons/condition-icon.vue";
import NoteIcon from "@/components/icons/note.vue";
import OnsetIcon from "@/components/icons/onset.vue";
import StageIcon from "@/components/icons/stage.vue";
import OrgCard from "./components/org-card.vue";
import PatientCard from "./components/patient-card.vue";
import { ICondition } from "@/types/ICondition";
import { Timeable } from "@/types/Timable";

import { printPractitioner } from "@/plugins/utils";
import { getDropdown } from "@/plugins/definitions";
import { Codeable } from "@/types/misc";
import Period from "@/types/IPeriod";
import { useFHIRDefinition } from "@/composables/useFHIRDefinition";

@Options({
  name: "ViewCondition",
  components: {
    ClinicalDialog,
    PatientCard,
    ConditionIcon,
    StageIcon,
    OnsetIcon,
    OrgCard,
    Avatar,
    NoteIcon,
  },
})
export default class ViewCondition extends Vue {
  @Prop({ type: Boolean, default: false })
  modelValue!: boolean;

  @PropSync("modelValue")
  show!: boolean;

  @Prop({ type: Object, required: true })
  condition!: ICondition;

  clinicalStatus = setup(() =>
    useFHIRDefinition("http://hl7.org/fhir/ValueSet/condition-clinical")
  );
  verificationStatus = setup(() =>
    useFHIRDefinition("http://hl7.org/fhir/ValueSet/condition-ver-status")
  );
  category = setup(() =>
    useFHIRDefinition("http://hl7.org/fhir/ValueSet/condition-category")
  );
  severity = setup(() =>
    useFHIRDefinition("http://hl7.org/fhir/ValueSet/condition-severity")
  );
  code = setup(() =>
    useFHIRDefinition("http://hl7.org/fhir/ValueSet/condition-code")
  );
  bodysite = setup(() =>
    useFHIRDefinition("http://hl7.org/fhir/ValueSet/body-site")
  );
  stage = setup(() =>
    useFHIRDefinition("http://hl7.org/fhir/ValueSet/condition-stage-type")
  );

  get item() {
    return this.condition || {};
  }

  get recorder() {
    if (!this.item.id) return {};
    const practitioner = this.item.practitioner!!;
    return {
      name: printPractitioner(practitioner),
      department: practitioner.department,
      date: new Date(this.item.createdAt!!).toLocaleDateString(),
    };
  }

  displayTimeable(item: Timeable, stringKey: string) {
    const value = { ...item };
    value.string = stringKey ? item[stringKey] : item.string;
    if (!value) return;
    if (value.dateTime) {
      return {
        key: "Date/Time",
        text: new Date(value.dateTime).toLocaleDateString(),
        subtext: this.printTime(value.dateTime),
      };
    } else if (value.age) {
      return {
        key: "Age",
        text: value.age,
      };
    } else if (value.period) {
      return {
        key: "Period",
        text: this.printPeriod(value.period),
      };
    } else if (value.string) {
      return {
        key: "String",
        text: value.string,
      };
    } else if (value.range) {
      return {
        key: "Range",
        text: `${value.range.min} ${value.range.unit} to ${value.range.max} ${value.range.unit}`,
      };
    }
  }

  get abatement() {
    if (!this.item.id) return;
    // const abatements = this.item.abatements;
    // if (!abatements?.length) return;
    // const abatement = abatements[0];
   // return this.displayTimeable(abatement, "string");
  }

  get onset() {
    if (!this.item.id) return;
    // const onset = this.item.onSet;
    // return this.displayTimeable(onset, "onsetString");
  }

  printPeriod(period: Period) {
    const start = new Date(period.start).toLocaleDateString();
    let end = "";
    if (period.end) end = new Date(period.end).toLocaleDateString();
    return `${start} - ${end}`;
  }

  printTime(timeString: string) {
    const date = new Date(timeString);
    return `${date.getHours()}:${date.getMinutes()}`;
  }

  loadDefinitions() {
    this.clinicalStatus.code = this.item?.clinicalStatus;
    this.verificationStatus.code = this.item?.verificationStatus;
    this.category.code = this.item?.category;
    this.severity.code = this.item?.severity;
    this.code.code = this.item?.code;
    this.bodysite.code = this.item?.bodySite;
    this.stage.code = this.item?.type;
  }

  async created() {
    this.loadDefinitions();
  }
}
</script>
