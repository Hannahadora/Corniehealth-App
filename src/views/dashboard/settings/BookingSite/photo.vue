<template>
  <div class="h-screen flex justify-center">
    <accordion-component
      title="Photos"
      :opened="true"
    >
    <template v-slot:default>

      <image-section class="mt-8 " />


          <div class="flex justify-end relative">
            <cornie-btn
              class="border-primary border-2 px-6 mr-3 rounded-xl text-primary"
            >
              Cancel
            </cornie-btn>
            <cornie-btn
              :loading="loading"
              class="text-white bg-danger px-6 rounded-xl"
            >
              Save
            </cornie-btn>
          </div>
    </template>
    </accordion-component>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/cornieselect.vue";
import PhoneInput from "@/components/phone-input.vue";
import AccordionComponent from "@/components/form-accordion.vue";
import OperationHours from "./new-operation-hours.vue";
import ILocation, { HoursOfOperation } from "@/types/ILocation";
import { cornieClient } from "@/plugins/http";
import { namespace } from "vuex-class";
import { string } from "yup";
import { Prop, Watch } from "vue-property-decorator";
import { getCoordinates } from "@/plugins/utils";
import { getCountries, getStates } from "@/plugins/nation-states";
import AutoComplete from "@/components/autocomplete.vue";
import Textarea from "@/components/textarea.vue";
import EditIcon from "@/components/icons/aedit.vue";
import CalendarIcon from "@/components/icons/calendar.vue";
import DateTimePicker from "./components/datetime-picker.vue";
import CornieTextArea from "@/components/textarea.vue";
import ImageSection from "./image.vue";
import CornieCard from "@/components/cornie-card";

const countries = getCountries();

const dropdown = namespace("dropdown");
const location = namespace("location");


@Options({
  components: {
    ...CornieCard,
    CornieInput,
    AutoComplete,
    CornieSelect,
    PhoneInput,
    OperationHours,
    Textarea,
    EditIcon,
    CalendarIcon,
    DateTimePicker,
    CornieTextArea,
    ImageSection,
    AccordionComponent,
  },
})
export default class AddLocationn extends Vue {
  @Prop({ type: String, default: "" })
  id!: string;

  @location.Action
  getLocationById!: (id: string) => Promise<ILocation>;

  loading = false;
  showImage = false;
 

  

  showImageSection() {
    this.showImage = true;
  }
 
  async created() {
;
  }
}
</script>

<style scoped>
input[type="time"]::-webkit-calendar-picker-indicator {
  background: none;
  display: none;
}
</style>
