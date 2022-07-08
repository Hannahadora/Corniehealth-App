<template>
  <div>
    <div class="grid grid-cols-5 gap-1 py-8 w-full justify-center" >
      <div v-for="(image, index) in itemsImage" :key="index">
        <img :src="image?.fileURL" alt="image" />
      </div>
      <div
        class="border border-gray-300 rounded-md w-60 h-52 cursor-pointer"
        @click="showUplaod"
      >
        <span
          class="text-xxl text-gray-300 top-40 right-65 font-normal relative"
          >+</span
        >
      </div>
    </div>
  </div>
  <!-- <rating-section :show-rating="shownew" :shownewupladmodal="true" v-else /> -->
  <uplaoder-modal v-model="showUplaodModal" @get-images="getImages"/>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/cornieselect.vue";
import PhoneInput from "@/components/phone-input.vue";
import OperationHours from "./new-operation-hours.vue";
import ILocation, { HoursOfOperation } from "@/types/ILocation";
import { cornieClient } from "@/plugins/http";
import { namespace } from "vuex-class";
import { string } from "yup";
import { Prop, Watch } from "vue-property-decorator";
import { flatten, getCoordinates } from "@/plugins/utils";
import { getCountries, getStates } from "@/plugins/nation-states";
import AutoComplete from "@/components/autocomplete.vue";
import Textarea from "@/components/textarea.vue";
import EditIcon from "@/components/icons/aedit.vue";
import CalendarIcon from "@/components/icons/calendar.vue";
import DateTimePicker from "./components/datetime-picker.vue";
import CornieTextArea from "@/components/textarea.vue";
import UplaoderModal from "./uploader.vue";
import RatingSection from "./rating.vue";
import IPracticeImage from "@/types/IPracticeImage";

const countries = getCountries();

const dropdown = namespace("dropdown");
const location = namespace("location");
const practiceimage = namespace("practiceimage");

@Options({
  components: {
    CornieInput,
    AutoComplete,
    CornieSelect,
    PhoneInput,
    OperationHours,
    Textarea,
    EditIcon,
    CalendarIcon,
    DateTimePicker,
    RatingSection,
    CornieTextArea,
    UplaoderModal,
  },
})
export default class AddLocationn extends Vue {
  @Prop({ type: String, default: "" })
  id!: string;



  @practiceimage.State
  practiceimages!: IPracticeImage[];

  @practiceimage.Action
  fetchpracticeImages!: () => Promise<void>;


  showUplaodModal = false;
  showImage = false;

  get itemsImage(){
    return this.practiceimages.flatMap((image) => image)
  }


  states = [] as any;
  
  showImageSection() {
    this.showImage = true;
  }
  showUplaod() {
    this.showUplaodModal = true;
  }
  getImages(){
     this.fetchpracticeImages();
  }
 
  async created() {
    this.fetchpracticeImages();
  
  }
}
</script>

<style scoped>
input[type="time"]::-webkit-calendar-picker-indicator {
  background: none;
  display: none;
}
.right-65 {
  left: 4.5rem;
  font-size: 150px;
}
.top-40 {
  top: -2rem;
}
</style>
