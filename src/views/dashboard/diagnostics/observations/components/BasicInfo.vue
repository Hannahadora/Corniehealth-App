<template>
  <div>
    <div class="grid grid-cols-2 gap-6 py-6">
      <div
        class="w-full cursor-pointer"
        @click="
          $emit('openReferenceModal', 'basedOn', [
            'CarePlan',
            'Device',
            'Immunization recommendation',
            'MedicationRequest',
            'Nutrition order',
            'Service request',
          ])
        "
      >
        <cornie-input
          v-bind="$attrs"
          label="based on"
          placeholder="--Select--"
          v-model="basicInfo.basedOn"
        >
          <template #append-inner>
            <plus-icon class="fill-current text-danger" />
          </template>
        </cornie-input>
      </div>
      <div
        class="w-full cursor-pointer"
        @click="
          $emit('openReferenceModal', 'partOf', [
            'MedicationAdministration',
            'MedicationDispense',
            'MedicationStatement',
            'Procedure',
            'Immunization',
            'ImagingStudy',
          ])
        "
      >
        <cornie-input
          v-bind="$attrs"
          label="Part Of"
          placeholder="--Select--"
          v-model="basicInfo.partOf"
        >
          <template #append-inner>
            <plus-icon class="fill-current text-danger" />
          </template>
        </cornie-input>
      </div>
      <fhir-input
        reference="http://hl7.org/fhir/ValueSet/observation-category"
        class="w-full"
        label="Category"
        placeholder="Select"
        v-model="basicInfo.category"
      />
      <fhir-input
        reference="http://hl7.org/fhir/ValueSet/observation-codes"
        class="w-full"
        label="Code"
        placeholder="Select"
        v-model="basicInfo.code"
      />
      <auto-complete
        v-bind="$attrs"
        label="Subject"
        placeholder="Select one"
        v-model="basicInfo.subject"
        :rules="required"
        :items="customers"
        @query="fetchCustomers"
      >
        <template #item="{ item }">
          <div class="w-full flex items-center my-1">
            <!-- <avatar :src="item.image" /> -->
            <div class="ml-4 flex flex-col">
              <span class="text-xs">{{ item.name }}</span>
              <span class="text-xs font-semibold text-gray-500">
                {{ item.mrn }}
              </span>
            </div>
          </div>
        </template>
      </auto-complete>

      <div class="relative">
        <div class=" absolute left-28 -top-1">
          <Tooltip
          class="text-white text-sm dropdown-menu "
          text="What the observation is about when it is not about the subject of record
                "
        >
          <div class="text-black text-sm flex space-x-2">
            <tooltip-icon class="cursor-pointer" />
          </div>
        </Tooltip>
        </div>
        <cornie-input
          class="w-full"
          label="Focus (Optional)"
          placeholder="Enter"
          v-model="basicInfo.focus"
        />
      </div>
      <encounter-select
        class="w-full"
        label="Encounter"
        placeholder="Select"
        v-model="basicInfo.encounter"
      />
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/cornieselect.vue";
import CustomCheckbox from "@/components/custom-checkbox.vue";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import CornieBtn from "@/components/CornieBtn.vue";
import { namespace } from "vuex-class";
import { CornieUser } from "@/types/user";
import { string } from "yup";
import AutoComplete from "@/components/autocomplete.vue";
import { cornieClient } from "@/plugins/http";
import CornieRadio from "@/components/cornieradio.vue";
import FhirInput from "@/components/fhir-input.vue";
import EncounterSelect from "@/views/dashboard/ehr/allergy/encounter-select.vue";
import TooltipIcon from "@/components/icons/formtip.vue";

import DateTimePicker from "@/components/date-time-picker.vue";
import DatePicker from "@/components/datetime-picker.vue";
import { first, getTableKeyValue } from "@/plugins/utils";
import { IObservationBasicInfo } from "@/types/IObservationBasicInfo";

import Tooltip from "@/components/tooltip.vue";
import { debounce } from "lodash";
import search from "@/plugins/search";

@Options({
  name: "BasicInfo",
  components: {
    CornieInput,
    CornieSelect,
    CustomCheckbox,
    CornieBtn,
    AutoComplete,
    CornieRadio,
    DateTimePicker,
    DatePicker,
    Tooltip,
    FhirInput,
    EncounterSelect,
    TooltipIcon,
  },
})
export default class BasicInfo extends Vue {
  @Prop({ type: Object, default: {} })
  basicInfo!: IObservationBasicInfo;

  required = string().required();

  customerDetails = [];
  query = "";

  @Watch("customers")
  queryUpdate() {
    this.$emit("get-customers", this.customerDetails);
  }

  fetchCustomers(query: string) {
    debounce(async () => {
      try {
        const { data } = await cornieClient().get(
          `/api/v1/pharmacy/find-customer/?query=${query}`
        );
        this.customerDetails = data || [];
      } catch (error) {
        window.notify({
          msg: "There was an error fetching customers details",
          status: "error",
        });
      }
    }, 1000)();
  }

  get customers() {
    const xCustomers = this.customerDetails?.map((customer: any) => {
      return {
        ...customer,
        code: customer.id,
        display: customer.name,
        name: customer.name,
        mrn: customer.mrn,
        id: customer.id,
      };
    });
    if (!this.query) return xCustomers;
    return search.searchObjectArray(xCustomers, this.query);
  }

  async created() {
    this.$emit("get-customers", this.customerDetails);
  }
}
</script>

<style scoped></style>
