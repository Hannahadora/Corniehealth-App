<template>
  <div>
    <div class="grid grid-cols-2 gap-6 py-6">
      <cornie-select
        class="w-full"
        label="Based On"
        placeholder="Select"
        v-model="basicInfo.basedOn"
        :items="['Care plan', 'Device request', 'Immunization Recommendation', 'Medication request', 'Nutrition order', 'Service request']"
      />
      <cornie-select
        class="w-full"
        label="Part of"
        placeholder="Select"
        v-model="basicInfo.partOf"
        :items="['Medication administration', 'Medication dispense', 'Medication statement', 'Procedure', 'Immunization', 'Imaging study']"
      />
      <cornie-select
        class="w-full"
        label="Category"
        placeholder="Select"
        v-model="basicInfo.category"
        :items="['a', 'b']"
      />
      <cornie-select
        class="w-full"
        label="Code"
        placeholder="Select"
        v-model="basicInfo.code"
        :items="['a', 'b']"
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
      <cornie-select
        class="w-full"
        label="Focus (Optional)"
        placeholder="Select"
        v-model="basicInfo.focus"
        :items="['a', 'b']"
      />
      <cornie-select
        class="w-full"
        label="Encounter"
        placeholder="Select"
        v-model="basicInfo.encounter"
        :items="['a', 'b']"
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

import DateTimePicker from "@/components/date-time-picker.vue";
import DatePicker from "@/components/datetime-picker.vue";
import { first, getTableKeyValue } from "@/plugins/utils";
import { IObservationBasicInfo } from "@/types/IObservationBasicInfo";

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
  },
})
export default class BasicInfo extends Vue {
  @Prop({ type: Object, default: <any>{} })
  basicInfo!: IObservationBasicInfo;

  required = string().required();

  customerDetails = [];
  query = "";

  
  @Watch("customers")
  queryUpdate() {
    this.$emit('get-customers', this.customerDetails);
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

  async created () {
    this.$emit('get-customers', this.customerDetails)
  }

}
</script>

<style scoped></style>
